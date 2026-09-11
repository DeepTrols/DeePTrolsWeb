# 智能制造解决方案页面布局调整
要求：不允许新建样式，必须通过Tailwind CSS v4
## Hero要求：
1、高度为586
2、采用首页Hero布局：
主标题：智能制造解决方案
描述：融合数曜数据智能、博曜知识中枢、探曜物联感知与智曜 AI 引擎，贯通制造企业设备、数据、知识与业务流程，构建从实时感知、数据治理、智能分析到自主决策与执行的制造智能体系，推动生产优化、质量提升、设备运维与能源管理持续智能化。
3、Hero背景使用doc/product/PAGE_REQUIREMENTS/SOLUTIONS/manufacturing.png
4、Hero 标题使用 DeepCtrls 首页式渐变文字；描述使用白色文字并放宽到 760px；`page-hero__actions` 独立定位，CTA 必须为透明背景、白色字体、白色外边框与白色 SVG 箭头。

section1:

section-heading__eyebrow：行业痛点
标题：制造业智能化转型，仍面临数据、设备、知识与 AI 的多重割裂
副标题：设备连接复杂、数据标准不一、系统相互割裂，制造知识难以沉淀复用，AI 与生产现场和业务流程缺乏有效连接，难以形成从感知、分析、决策到执行的智能闭环。
ProductFeatureGridSection组件BaseCard 2X2  使用大ICON

设备连接复杂，生产现场难以统一感知
PLC、CNC、机器人、仪器仪表、传感器及各类工业设备品牌和协议复杂，设备数据分散在不同产线与控制系统中，缺乏统一接入、实时采集与状态监测能力。

业务系统割裂，制造数据难以形成统一资产
ERP、MES、WMS、QMS、SCADA、EMS 等系统长期独立建设，数据标准、编码体系和数据模型不统一，形成大量数据孤岛，跨系统数据难以关联、分析和复用。

制造知识高度依赖人员经验
工艺参数、设备维修经验、质量问题处理方法、SOP 与技术文档分散在人员、文件和业务系统中，难以形成结构化、可检索、可推理、可持续积累的企业知识体系。

AI 与实际生产流程脱节
企业虽然已经开始应用大模型、机器视觉和数据分析技术，但大量 AI 应用仍停留在单点试验阶段，模型难以获取实时工业数据、调用企业知识并与生产系统形成业务闭环。



section2:
section-heading__eyebrow：解决方案
标题：融合数据、知识、物联与 AI，构建制造智能闭环
副标题：贯通设备、数据、知识与业务，让 AI 深入制造核心场景，实现从感知、分析到决策与执行的智能闭环。

该部分由两个组件构成

组件1:ProductSystemFlowFrame组件，flow暂时不传入


组件2:ProductFeatureGridSection组件BaseCard

连接生产现场
统一接入 PLC、CNC、机器人、传感器及工业控制系统，兼容多种工业协议，实现设备连接、实时数据采集与边缘协同，构建基于探曜的生产现场感知体系。

统一制造数据
打通设备数据与 ERP、MES、WMS、SCADA 等业务系统，统一数据标准、模型与指标体系，依托数曜形成贯穿生产全流程的可信数据底座。

沉淀制造知识
整合工艺文件、设备资料、质量标准、SOP 与运维经验，将分散的制造知识结构化、资产化，并由博曜提供统一的知识检索、理解与智能服务。

驱动智能生产
融合实时生产数据、制造知识与 AI 模型，依托智曜构建设备运维、质量分析、工艺优化与生产决策等智能应用，让 AI 从分析辅助走向业务决策与执行。


section3:

section-heading__eyebrow：核心功能体系
标题：四大核心功能，覆盖设备、质量、生产与能源全场景
副标题：融合工业物联、数据智能、企业知识与 AI 能力，构建设备预测性维护、AI视觉质量检测、APS智能生产排程与工厂能源智能管理四大核心能力，提升制造企业生产效率、质量水平、设备可靠性与能源利用效率。

新建组件
参考https://www.deepctrls.com/deepctrls_com/solutions/manufacturing 中的<article data-v-ced3d806="" class="sc-card" tabindex="0" style="left: 370px;"><div data-v-ced3d806="" class="sc-card__media"><div data-v-ced3d806="" class="sc-card__frame sc-card__frame--full"><img data-v-ced3d806="" src="/deepctrls_com/images/solutions/manufacturing/matrix-deepsys.webp" alt="DeepSYS 系统优化智能体"><!----></div></div><div data-v-ced3d806="" class="sc-card__body"></div><div data-v-ced3d806="" class="sc-card__content"><!----><h3 data-v-ced3d806="">DeepSYS 系统优化智能体</h3><span data-v-ced3d806="" class="sc-card__point" style="top: calc(var(--sc-point, 268px) + 0px);">系统节能 10%–40%</span><span data-v-ced3d806="" class="sc-card__point" style="top: calc(var(--sc-point, 268px) + 26px);">RRMSE&lt;3%</span><span data-v-ced3d806="" class="sc-card__point" style="top: calc(var(--sc-point, 268px) + 52px);">百万工况寻优</span></div><p data-v-ced3d806="" class="sc-card__desc">面向中央空调、空压、冷站及工艺公辅系统，基于高精度机理建模与全局寻优能力，实现系统级闭环优化控制。</p></article>
图片使用图片占位符，只需要参考排版和动画效果，不要发挥创造

APS智能生产排程
・多约束产能智能规划
・有限产能动态排程
・生产扰动实时重排

综合订单、工艺路线、设备产能、物料齐套与交期等约束，自动生成可执行生产计划，并根据插单、故障等生产扰动进行动态重排，提升产能利用与交付效率。

设备预测性维护
・健康状态实时感知
・异常根因智能诊断
・设备风险预测维护

融合设备实时运行数据、历史故障与运维知识，持续评估设备健康状态，智能诊断异常根因并预测潜在故障风险，实现从被动维修向预测性维护转变。


工业知识工程
・多源工业知识沉淀
・工业知识关联建模
・生产知识智能服务

统一汇聚工艺规范、设备手册、SOP、故障案例与专家经验，通过知识抽取、关联与语义理解构建企业工业知识体系，为工艺辅助、故障诊断、作业指导与智能决策提供可信知识支撑。

工业智能体协同
・生产运营智能分析
・工业知识智能推理
・业务任务自主执行

融合生产实时数据、工业知识与业务系统能力，构建面向设备、工艺、生产与运营场景的工业智能体，实现从信息获取、分析推理到任务执行的智能化业务协同。



section4:

无section-heading__eyebrow
标题：为什么选择深度数智
副标题：融合数据、知识、物联与AI能力，打通从生产现场到企业智能的关键链路，让数据可治理、知识可复用、设备可感知、AI可执行。

ProductFeatureGridSection组件BaseCard  3x3x3

OT/IT深度融合
贯通PLC、CNC、机器人等生产设备与 MES、ERP、WMS、SCADA等业务系统，连接生产现场与管理系统，构建统一的制造数据链路。

多源异构数据治理
统一汇聚设备、生产、工艺、质量、物料与经营数据，通过数曜完成数据标准化、治理、开发与资产化，为制造分析和 AI 应用提供可信数据基础。

工业知识工程
将工艺规范、设备手册、SOP、故障案例与专家经验转化为结构化工业知识，通过博曜实现知识沉淀、关联、检索与智能调用。

全域设备感知
基于探曜连接设备、产线与边缘节点，实现工业协议接入、实时数据采集、设备状态监测与事件感知，为生产智能化提供实时数据入口。

边云协同计算
支持边缘侧数据处理、规则计算与实时响应，并与云端数据和AI能力协同，在满足工业现场低时延需求的同时实现集中管理与智能分析。

企业级AI智能体
基于智曜构建设备、工艺、生产与运营智能体，融合实时数据与工业知识，使AI能够理解生产上下文、分析问题并辅助业务决策。

AI与业务闭环
通过 MCP、Tools、API 与 Workflow 连接企业现有业务系统，让AI不止于问答和分析，还能够调用工具、触发流程并协同完成业务任务。

开放技术架构
兼容主流工业协议、数据库、消息系统、AI 模型与企业应用，通过标准API和开放接口融入企业现有技术体系，降低系统集成与持续扩展成本。

私有化与自主部署
支持企业本地、私有云及混合环境部署，核心数据、知识与模型可运行于企业自主环境，满足制造企业对数据安全、系统可控与持续运营的要求。


section5:
参考https://www.emqx.com/zh/solutions/smart-manufacturing 中的 <section class="container pb-32 lg:pb-44"><div class="flex flex-col gap-11"><div class="flex flex-col"><div class="flex flex-col lg:flex-row border border-default rounded-t-lg"><div class="flex flex-col gap-6 p-8 lg:p-12 flex-1"><div class="lg:hidden flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--c-logo-full text-[80px] text-highlighted" width="1em" height="1em" viewBox="0 0 120 120"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2908 44.3036C24.845 44.3043 28.3996 44.339 31.9531 44.2872C33.3449 44.2667 33.9387 44.7364 33.9387 46.1886C33.9387 47.6447 33.346 48.087 31.9506 48.0728C27.0491 48.0229 22.1454 47.997 17.2446 48.0889C15.5524 48.1206 13.8301 48.3857 12.1956 48.8186C11.4753 49.0097 10.4343 49.8943 10.4439 50.4486C10.4568 51.1988 11.1701 52.2428 11.8772 52.6268C17.9329 55.9169 24.0721 59.0545 30.1403 62.3216C31.1784 62.8803 32.148 63.7179 32.8919 64.6329C35.9927 68.4484 34.7168 72.4583 30.1249 74.3823C27.1873 75.6131 24.1302 75.5722 21.1224 75.666C14.8174 75.8629 8.50133 75.709 2.18969 75.7287C0.966703 75.7327 -0.00330089 75.6448 8.44254e-06 74.041C0.00258237 72.4386 0.965599 72.3442 2.19373 72.361C5.44129 72.4062 8.69033 72.4488 11.9368 72.3876C14.7431 72.3347 17.5476 72.1502 20.3513 71.993C20.8301 71.966 21.3879 71.9066 21.7552 71.6477C22.505 71.1196 23.4812 70.5464 23.7147 69.7937C23.8552 69.3408 22.9072 68.2712 22.2178 67.8941C17.0269 65.0555 11.7743 62.3289 6.55323 59.5446C5.4788 58.9717 4.39113 58.3886 3.41929 57.6651C-1.42301 54.0589 -1.0667 48.6858 4.36613 46.1448C6.56316 45.1172 9.11502 44.5993 11.5544 44.3758C14.7747 44.0804 18.0432 44.3032 21.2908 44.3036Z" fill="#0061AE"></path>
<mask id="iconifyVue237" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="86" y="44" width="34" height="32">
<path fill-rule="evenodd" clip-rule="evenodd" d="M86.0625 44.29H120V75.7418H86.0625V44.29Z" fill="white"></path>
</mask>
<g mask="url(#iconifyVue237)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M107.13 44.3017C110.56 44.3017 113.99 44.3071 117.42 44.2987C118.73 44.2955 119.982 44.0934 120 46.137C120.019 48.2591 118.727 48.1048 117.334 48.1004C113.169 48.0869 109.003 48.0651 104.839 48.1096C103.438 48.1245 102.03 48.2598 100.644 48.4629C98.7589 48.7393 97.9029 49.7841 97.8989 51.691C97.8889 57.0378 97.8981 62.3846 97.9007 67.7317C97.9029 71.3569 98.5795 72.0228 102.338 72.0297C107.544 72.0392 112.752 72.0545 117.957 72.0104C119.324 71.9987 119.996 72.4054 119.978 73.8783C119.962 75.1856 119.508 75.749 118.148 75.7417C111.532 75.7074 104.916 75.7771 98.3015 75.6947C96.1798 75.6684 94.0299 75.45 91.9501 75.0368C88.3812 74.3279 86.0809 71.3591 86.0709 67.7361C86.0566 62.6931 86.0628 57.6497 86.0728 52.6067C86.079 49.5952 87.4285 47.4564 90.1855 46.0951C92.648 44.8789 95.187 44.2386 97.9419 44.2933C101.003 44.3542 104.067 44.3071 107.13 44.3071V44.3017Z" fill="#0061AE"></path>
</g>
<mask id="iconifyVue238" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="43" y="44" width="35" height="32">
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.3242 44.2695H77.019V75.7779H43.3242V44.2695Z" fill="white"></path>
</mask>
<g mask="url(#iconifyVue238)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M64.1756 44.2872C67.7901 44.2872 71.4054 44.3215 75.0192 44.2701C76.4183 44.25 77.0048 44.7573 77.0187 46.1824C77.0327 47.6203 76.4337 48.1156 75.042 48.1021C70.6927 48.0605 66.3428 48.0871 61.9929 48.0878C61.4413 48.0878 60.889 48.0678 60.3389 48.0973C55.8033 48.3427 54.9348 49.2365 54.9278 53.695C54.9201 58.5568 54.9039 63.4186 54.9399 68.28C54.9602 71.0365 55.9232 71.9905 58.7497 72.012C64.1406 72.0532 69.5323 72.0529 74.9232 72.0128C76.241 72.0029 76.9897 72.2855 77.0128 73.8044C77.0375 75.4035 76.2649 75.7437 74.8585 75.7357C68.4873 75.6981 62.1076 75.9056 55.7474 75.6412C52.7786 75.518 49.6057 75.9899 46.8486 74.1381C44.6229 72.6433 43.2742 70.8221 43.3256 68.0091C43.4238 62.6021 43.3639 57.1926 43.3804 51.7841C43.3878 49.3773 44.5641 47.6765 46.6159 46.4661C49.2034 44.94 51.9641 44.2125 54.9866 44.2913C58.0478 44.3711 61.1126 44.3091 64.1756 44.3091V44.2872Z" fill="#0061AE"></path>
</g></g></svg></div><h3 class="text-2xl lg:text-3xl font-bold text-highlighted">深南电路</h3><p class="text-base text-default leading-relaxed">深南电路通过 EMQX 统一设备数据（EAP），实现实时工艺控制和故障检测。EMQX 每秒处理数百万数据标签，确保精密制造所需的高可靠性和低延迟。</p><div class="grid grid-cols-1 border border-default rounded-lg overflow-hidden lg:grid-cols-3"><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">350 万+</span>数据标签/单厂</span></p></div><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center border-t lg:border-t-0 lg:border-l border-default"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">100ms</span>采集频率</span></p></div><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center border-t lg:border-t-0 lg:border-l border-default"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">100%</span>数据完整率</span></p></div></div><div><a href="/zh/customers/scc" data-slot="base" class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors justify-center cursor-pointer px-3 py-2 text-base gap-2 bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white"><!---->查看案例详情<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg></a></div></div><div class="hidden lg:flex items-center justify-center border-default p-8 lg:p-12 lg:w-[320px] border-l"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--c-logo-full text-[100px] text-highlighted" width="1em" height="1em" viewBox="0 0 120 120"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2908 44.3036C24.845 44.3043 28.3996 44.339 31.9531 44.2872C33.3449 44.2667 33.9387 44.7364 33.9387 46.1886C33.9387 47.6447 33.346 48.087 31.9506 48.0728C27.0491 48.0229 22.1454 47.997 17.2446 48.0889C15.5524 48.1206 13.8301 48.3857 12.1956 48.8186C11.4753 49.0097 10.4343 49.8943 10.4439 50.4486C10.4568 51.1988 11.1701 52.2428 11.8772 52.6268C17.9329 55.9169 24.0721 59.0545 30.1403 62.3216C31.1784 62.8803 32.148 63.7179 32.8919 64.6329C35.9927 68.4484 34.7168 72.4583 30.1249 74.3823C27.1873 75.6131 24.1302 75.5722 21.1224 75.666C14.8174 75.8629 8.50133 75.709 2.18969 75.7287C0.966703 75.7327 -0.00330089 75.6448 8.44254e-06 74.041C0.00258237 72.4386 0.965599 72.3442 2.19373 72.361C5.44129 72.4062 8.69033 72.4488 11.9368 72.3876C14.7431 72.3347 17.5476 72.1502 20.3513 71.993C20.8301 71.966 21.3879 71.9066 21.7552 71.6477C22.505 71.1196 23.4812 70.5464 23.7147 69.7937C23.8552 69.3408 22.9072 68.2712 22.2178 67.8941C17.0269 65.0555 11.7743 62.3289 6.55323 59.5446C5.4788 58.9717 4.39113 58.3886 3.41929 57.6651C-1.42301 54.0589 -1.0667 48.6858 4.36613 46.1448C6.56316 45.1172 9.11502 44.5993 11.5544 44.3758C14.7747 44.0804 18.0432 44.3032 21.2908 44.3036Z" fill="#0061AE"></path>
<mask id="iconifyVue239" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="86" y="44" width="34" height="32">
<path fill-rule="evenodd" clip-rule="evenodd" d="M86.0625 44.29H120V75.7418H86.0625V44.29Z" fill="white"></path>
</mask>
<g mask="url(#iconifyVue239)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M107.13 44.3017C110.56 44.3017 113.99 44.3071 117.42 44.2987C118.73 44.2955 119.982 44.0934 120 46.137C120.019 48.2591 118.727 48.1048 117.334 48.1004C113.169 48.0869 109.003 48.0651 104.839 48.1096C103.438 48.1245 102.03 48.2598 100.644 48.4629C98.7589 48.7393 97.9029 49.7841 97.8989 51.691C97.8889 57.0378 97.8981 62.3846 97.9007 67.7317C97.9029 71.3569 98.5795 72.0228 102.338 72.0297C107.544 72.0392 112.752 72.0545 117.957 72.0104C119.324 71.9987 119.996 72.4054 119.978 73.8783C119.962 75.1856 119.508 75.749 118.148 75.7417C111.532 75.7074 104.916 75.7771 98.3015 75.6947C96.1798 75.6684 94.0299 75.45 91.9501 75.0368C88.3812 74.3279 86.0809 71.3591 86.0709 67.7361C86.0566 62.6931 86.0628 57.6497 86.0728 52.6067C86.079 49.5952 87.4285 47.4564 90.1855 46.0951C92.648 44.8789 95.187 44.2386 97.9419 44.2933C101.003 44.3542 104.067 44.3071 107.13 44.3071V44.3017Z" fill="#0061AE"></path>
</g>
<mask id="iconifyVue240" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="43" y="44" width="35" height="32">
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.3242 44.2695H77.019V75.7779H43.3242V44.2695Z" fill="white"></path>
</mask>
<g mask="url(#iconifyVue240)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M64.1756 44.2872C67.7901 44.2872 71.4054 44.3215 75.0192 44.2701C76.4183 44.25 77.0048 44.7573 77.0187 46.1824C77.0327 47.6203 76.4337 48.1156 75.042 48.1021C70.6927 48.0605 66.3428 48.0871 61.9929 48.0878C61.4413 48.0878 60.889 48.0678 60.3389 48.0973C55.8033 48.3427 54.9348 49.2365 54.9278 53.695C54.9201 58.5568 54.9039 63.4186 54.9399 68.28C54.9602 71.0365 55.9232 71.9905 58.7497 72.012C64.1406 72.0532 69.5323 72.0529 74.9232 72.0128C76.241 72.0029 76.9897 72.2855 77.0128 73.8044C77.0375 75.4035 76.2649 75.7437 74.8585 75.7357C68.4873 75.6981 62.1076 75.9056 55.7474 75.6412C52.7786 75.518 49.6057 75.9899 46.8486 74.1381C44.6229 72.6433 43.2742 70.8221 43.3256 68.0091C43.4238 62.6021 43.3639 57.1926 43.3804 51.7841C43.3878 49.3773 44.5641 47.6765 46.6159 46.4661C49.2034 44.94 51.9641 44.2125 54.9866 44.2913C58.0478 44.3711 61.1126 44.3091 64.1756 44.3091V44.2872Z" fill="#0061AE"></path>
</g></g></svg></div></div><div class="flex flex-col gap-4 px-8 lg:px-12 py-6 border border-t-0 border-default rounded-b-lg"><p class="text-base lg:text-lg font-bold text-highlighted leading-relaxed"> "EMQ 提供的云边一体化解决方案帮助我们进行设备数据的实时采集、分析和存储，更好地利用边缘硬件的算力完善我们的产品质量管理体系。在项目推进过程中，除了专业的技术能力，EMQ 的服务响应速度和积极的服务态度同样令我们印象深刻。" </p><p class="text-sm lg:text-base text-default text-right"> ————深南电路 IT 主管 许海龙</p></div></div><div class="flex flex-col"><div class="flex flex-col lg:flex-row border border-default lg:flex-row-reverse rounded-lg"><div class="flex flex-col gap-6 p-8 lg:p-12 flex-1"><div class="lg:hidden flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-[80px] text-highlighted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></g></svg></div><h3 class="text-2xl lg:text-3xl font-bold text-highlighted">汽车制造</h3><p class="text-base text-default leading-relaxed">某头部新能源汽车制造商部署 EMQX，打造统一数据平台，连接四大车间数千台设备。实现实时监控，数据延迟降至 10ms，为高级分析奠定基础。</p><div class="grid grid-cols-1 border border-default rounded-lg overflow-hidden lg:grid-cols-3"><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">10 万+</span>数据标签</span></p></div><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center border-t lg:border-t-0 lg:border-l border-default"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">10ms</span>数据延迟</span></p></div><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center border-t lg:border-t-0 lg:border-l border-default"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">99.99%</span>平台可用性</span></p></div></div><div><a href="/zh/customers/building-an-intelligent-manufacturing-platform-based-on-emqx" data-slot="base" class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors justify-center cursor-pointer px-3 py-2 text-base gap-2 bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white"><!---->查看案例详情<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg></a></div></div><div class="hidden lg:flex items-center justify-center border-default p-8 lg:p-12 lg:w-[320px] border-r"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-[100px] text-highlighted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></g></svg></div></div><!----></div><div class="flex flex-col"><div class="flex flex-col lg:flex-row border border-default rounded-lg"><div class="flex flex-col gap-6 p-8 lg:p-12 flex-1"><div class="lg:hidden flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-[80px] text-highlighted" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20m14-7V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2zm0 0v7"></path></svg></div><h3 class="text-2xl lg:text-3xl font-bold text-highlighted">食品饮料制造</h3><p class="text-base text-default leading-relaxed">某全球食品饮料巨头构建智能生产中心，连接 50 多家工厂。平台接入 100 万+数据标签，实时监控设备状态和工艺参数，OEE 提升 15%。</p><div class="grid grid-cols-1 border border-default rounded-lg overflow-hidden lg:grid-cols-3"><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">50+</span>连接工厂</span></p></div><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center border-t lg:border-t-0 lg:border-l border-default"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">100 万+</span>数据标签</span></p></div><div class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center border-t lg:border-t-0 lg:border-l border-default"><p class="text-lg lg:text-xl font-bold text-highlighted"><span><span class="gradient">15%</span> OEE 提升</span></p></div></div><div><a href="/zh/customers/a-global-leader-builds-a-smart-production-hub-with-emq" data-slot="base" class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors justify-center cursor-pointer px-3 py-2 text-base gap-2 bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white"><!---->查看案例详情<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg></a></div></div><div class="hidden lg:flex items-center justify-center border-default p-8 lg:p-12 lg:w-[320px] border-l"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-[100px] text-highlighted" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20m14-7V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2zm0 0v7"></path></svg></div></div><!----></div></div></section>

排版与样式，我需要1:1还原，不要发散与创造，同时形成新组件（图片使用占位符）

内容如下：

某大型装备制造企业

围绕关键生产设备与核心产线，建设统一设备数据采集与智能运维体系，贯通设备实时状态、历史故障记录与维修知识。通过设备健康评估、异常诊断与风险预测，推动运维模式由故障后维修向预测性维护转变。

2,000+
关键设备接入

30%
异常响应效率提升

20%
非计划停机降低

查看案例详情 →

⸻

某汽车零部件制造企业

打通 ERP、MES、设备及生产现场数据，围绕订单、工艺路线、设备产能和物料齐套构建 APS 智能排程体系。在插单、设备异常和计划变更等场景下实现动态重排，提升生产计划执行与资源协同效率。

10,000+
生产数据点接入

25%
排产效率提升

15%
设备利用率提升

查看案例详情 →

⸻

某高端制造企业

统一汇聚工艺文件、设备手册、SOP、故障案例及专家经验，构建企业工业知识体系，并结合生产实时数据与工业智能体，为现场人员提供工艺查询、故障辅助诊断、作业指导与生产决策支持。

100,000+
工业知识条目

60%
知识检索效率提升

40%
问题处理时间缩短

查看案例详情 →

