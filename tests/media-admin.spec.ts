import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { extensionForMime, MAX_UPLOAD_BYTES, sniffImageMime } from '../server/utils/media-admin'
import { createLocalStorageDriver } from '../server/utils/storage'

describe('sniffImageMime', () => {
  it('按 magic bytes 识别白名单位图类型', () => {
    expect(sniffImageMime(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))).toBe('image/png')
    expect(sniffImageMime(Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00]))).toBe('image/jpeg')
    expect(sniffImageMime(Buffer.from('GIF89a0000', 'ascii'))).toBe('image/gif')
    expect(sniffImageMime(Buffer.from('RIFF0000WEBP', 'ascii'))).toBe('image/webp')
  })

  it('非白名单类型（SVG/文本/空 buffer）返回 null', () => {
    expect(sniffImageMime(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg">'))).toBeNull()
    expect(sniffImageMime(Buffer.from('plain text'))).toBeNull()
    expect(sniffImageMime(Buffer.alloc(0))).toBeNull()
  })

  it('白名单 mime 均有扩展名映射，上限 5MB', () => {
    expect(extensionForMime('image/png')).toBe('.png')
    expect(extensionForMime('image/jpeg')).toBe('.jpg')
    expect(extensionForMime('image/gif')).toBe('.gif')
    expect(extensionForMime('image/webp')).toBe('.webp')
    expect(MAX_UPLOAD_BYTES).toBe(5 * 1024 * 1024)
  })
})

describe('createLocalStorageDriver', () => {
  let root: string

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), 'dt-uploads-'))
  })

  afterEach(async () => {
    await rm(root, { force: true, recursive: true })
  })

  it('save 落盘并返回 /uploads/YYYY-MM/ 前缀路径，文件内容一致', async () => {
    const driver = createLocalStorageDriver(root)
    const content = Buffer.from([0x89, 0x50, 0x4E, 0x47])
    const path = await driver.save(content, '.png')

    expect(path).toMatch(/^\/uploads\/\d{4}-\d{2}\/[0-9a-f-]{36}\.png$/)
    const saved = await readFile(join(root, path.slice('/uploads/'.length)))
    expect(saved.equals(content)).toBe(true)
  })

  it('delete 删除已保存文件且幂等', async () => {
    const driver = createLocalStorageDriver(root)
    const path = await driver.save(Buffer.from('x'), '.png')
    await driver.delete(path)
    await expect(readFile(join(root, path.slice('/uploads/'.length)))).rejects.toThrow()
    // 再删一次不报错
    await expect(driver.delete(path)).resolves.toBeUndefined()
  })

  it('delete 拒绝目录穿越与非 uploads 前缀路径', async () => {
    const driver = createLocalStorageDriver(root)
    const hostage = join(root, 'hostage.txt')
    await writeFile(hostage, 'keep')

    await driver.delete('/uploads/../hostage.txt')
    await driver.delete('/etc/passwd')
    await driver.delete('../hostage.txt')

    await expect(readFile(hostage, 'utf8')).resolves.toBe('keep')
  })
})
