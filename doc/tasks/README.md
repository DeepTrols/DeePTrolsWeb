# Tasks
---
* name：任务说明
* description：该文件用于描述任务创建、执行等流程，并规范任务验收标准和要求。
* author：quanlei@deeptrols.com
---
## 目录说明
本目录用于管理项目所有开发任务，并作为项目任务管理与实施记录的唯一来源。
每个任务对应一个独立的 Markdown 文件，任务从创建到完成的整个生命周期均通过文件状态进行管理。
---
## 目录结构
```
docs/tasks/
├── README.md   # 任务管理说明，定义整个任务体系和流转规则
├── TASK_TEMPLATE.md   # 新建任务时复制使用的标准模板
├── backlog/    # 待开发任务，所有已规划但尚未开始的任务均存放于此目录。
├── in-progress/   # 正在开发中的任务，包含实施记录和实时进度，任务开始执行后，应从 backlog/ 移动至此目录。
├── review/   # 待验收任务，开发完成但尚未通过最终验收的任务存放于此目录。
├── completed/  # 已完成且通过验收的任务，所有完成任务均应长期保留，不得删除。
└── archived/   # 被取消、废弃或不再执行的任务，必须记录废弃原因，禁止直接删除。
```
---
## 任务编号规范
任务编号采用两级编号，目前仅支持两级
- 父任务-Epic，示例如下：
  ```
  EPIC-001
  EPIC-002
  EPIC-003
  ```
  > Epic 用于描述一个完整的业务目标，不直接对应具体开发工作。例如：
   > - EPIC-001 官网工程基础
   > - EPIC-002 设计系统
   > - EPIC-003 官网导航
   > - EPIC-004 首页
- 开发任务-Task，示例如下：
  ```
  TASK-001.1
  TASK-001.2
  TASK-001.3
  ```
  > Task 为可独立开发、独立测试、独立验收的最小工作单元。例如：
    > - TASK-003.1 顶部公告栏
    > - TASK-003.2 桌面导航
    > - TASK-003.3 Mega Menu
    > - TASK-003.4 Sticky Header
---
## 任务生命周期
所有任务必须遵循以下流程：
```
Backlog
    ↓
In Progress
    ↓
Review
    ↓
Completed
```
> 如任务取消则`Backlog -> Archived`或`In Progress -> Archived `，禁止跳过流程。
---
## 新建任务
新建任务请严格按照以下步骤：
```
Step1:复制TASK_TEMPLATE.md
Step2:按照编号命名
Step3:放入backlog/
Step4:完善任务内容
```
---
## 开始任务
开始开发前必须：
- 阅读AGENT.md
- 阅读任务文件
- 阅读任务引用的所有文档及文件
- 阅读 `doc/engineering/HOME_PAGE_BASELINE.md`
- 阅读 `doc/engineering/HARNESS_ENGINEERING.md`
- 输出实施计划
- 将任务移动至in-progress/
---
## 开发要求
开发过程中必须：
- 不修改无关代码
- 不删除已有功能规避问题
- 保持代码风格一致 
- 保证 TypeScript 类型完整
- 保证组件职责单一
- 保证所有配置集中管理
- 保证任务文件同步更新
---
## 完成任务
完成开发后必须：
- TypeScript 检查通过
- ESLint 检查通过
- Build 成功
- 单元测试通过
- E2E 测试通过
- Harness Engineering 检查通过
- 浏览器验证完成
- 响应式验证完成
- 更新实施记录
- 更新测试结果
- 更新截图路径
- 更新已知问题
> 完成以上步骤后需要：
  > 1. 提交 Git Commit
  > 2. Push 到指定 GitHub 分支
  > 3. 确认 Push 成功
  > 4. 将任务移动至 review/

通过验收后将任务移至completed/

---
## Archived 规范
任务进入 archived/ 时必须说明废弃原因、废弃时间、替代方案（如有）、关联任务（如有），禁止直接删除任务

---
## 任务原则
每个任务应该满足单一目标、可独立开发、可独立测试、可独立验收、可独立回滚以及可追踪修改记录。
任务颗粒度应控制在一次开发周期内能够完成，避免将多个无关功能放入同一任务。

---
## 任务状态
任务文件中必须包含以下状态之一：
```
Backlog  #待执行任务
In Progress #执行中任务
Review #待验收任务
Completed #已完成任务
Archived #已取消、删除、异常任务
```
状态必须与所在的目录保持一致。

---
## 文档维护
所有任务文档属于项目资产，禁止删除历史任务，任何任务完成后必须保留原始需求、实施记录、修改说明、测试结果、验收记录和已知问题。
确保项目具备完整的开发溯源能力。

## git工作流
所有开发任务必须使用 Git 管理。
任务开始前：
- 保持本地仓库最新
- 确认当前分支

开发过程中：

- 保持提交粒度清晰
- 不提交临时代码
- 不提交调试代码
- 不提交无关修改

进入 Review 前必须：
- Git Commit
- Git Push

确认远程仓库提交成功后方可进入 Review。

任务最终完成后：
- 更新任务状态
- 将任务移动至 completed/

## Harness Engineering
页面、样式、组件或文档相关任务必须执行：

```bash
pnpm harness:engineering
```

该命令用于检查 HOME 基准、公共设计系统、SCSS、inline style、`@apply`、Footer 结构等工程约束，详见 `doc/engineering/HARNESS_ENGINEERING.md`。
