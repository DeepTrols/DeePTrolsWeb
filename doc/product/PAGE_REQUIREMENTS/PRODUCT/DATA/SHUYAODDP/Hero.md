# product/data/ddp
> 数曜·数据开发平台page-hero__visual  

要求：不允许新建样式，必须通过Tailwind CSS v4

- 使用https://www.emqx.com/zh/features/data-processing 并1:1还原 <div class="relative"><div class="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl" aria-hidden="true"></div><div class="relative overflow-hidden rounded-2xl border border-muted bg-default shadow-2xl"><div class="flex items-center border-b border-muted px-4 py-3"><div class="flex gap-1.5"><div class="size-3 rounded-full bg-red-500/70"></div><div class="size-3 rounded-full bg-yellow-500/70"></div><div class="size-3 rounded-full bg-green-500/70"></div></div></div><div class="flex border-b border-muted"><button type="button" class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors text-muted hover:text-highlighted"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-4" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"></path></svg> 规则引擎</button><button type="button" class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 border-primary text-highlighted"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-4" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect></g></svg> Flow 编排器</button></div><div class="relative h-[320px]"><div class="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-0"><div class="relative h-full p-4">……不要创作以及新建样式，不要发散
## Tab
- 规则引擎 → SQL 开发
- Flow 编排器 → 可视化编排

## SQL

替换为：

```sql

INSERT OVERWRITE TABLE dws_user_order_summary

PARTITION (dt='${bizdate}')

SELECT

  o.user_id,

  u.region,

  SUM(o.order_amount) AS total_amount,

  COUNT(DISTINCT o.order_id) AS order_cnt,

  AVG(o.order_amount) AS avg_amount

FROM dwd_order_detail o

LEFT JOIN dim_user_info u

  ON o.user_id = u.user_id

WHERE o.order_status = 'SUCCESS'

  AND o.dt = '${bizdate}'

GROUP BY o.user_id, u.region


## Flow 节点
* MQTT Messages / factory/+/status → DWD Detail / dwd_order_detail
* Filter & Transform / temp > 45 → Data Transform / join · aggregate
* Kafka / alerts topic → DIM Join / dim_user_info
* PostgreSQL / events table → DWS Summary / dws_user_order_summary
* MQTT Publish / alerts/critical → ADS Application / ads_user_value

同步将 MQTT、Kafka、PostgreSQL 等图标替换为对应的数据表/数仓类 Lucide 图标。

除此之外不要修改任何现有样式、布局、节点位置、连线、动画和交互逻辑。