---
title: 從 Prompt 到 Context 再到 Harness：駕馭 AI agent 的 Harness
slug: 2026-05-11T00:00:00.000Z
date: 2026-05-11T00:00:00.000Z
tags: ["AI"]
---

## 前言

想像一位騎師面對一匹力量強大卻不受拘束的野馬，他靠的是韁繩、馬鞍與馬勒這套**馬具（harness）**，把馬的力量導引到正確的方向；蠻力壓制天性反而行不通。一旦少了這套器材，再強的馬也很難跑出一條穩定的路線。換句話說，**馬的可用性不在於馬本身，而在於我們如何駕馭它**。

如下圖

![0396755b-9feb-4c68-88c8-cedb38c7ec80](https://hackmd.io/_uploads/SJutffekfe.png)



近兩年 AI 領域出現了一個角色：`harness engineer`。我們從 prompt engineering 為起始點、經歷了 context engineering 的階段，如今來到了 harness engineering。這三者其實是責任邊界層層外推的關係，後者把前者包進來，向更大的系統治理範圍延伸。

本文將透過三階段的對比，帶你掌握為什麼 harness engineering 是 2026 年 AI agent 落地的關鍵，並借鑒 Anthropic、OpenAI、Stripe 等團隊的實務經驗，整理出**五大支柱**與建議。

## 什麼是 harness engineering？從字根談起

`harness` 在英文字典中的原意是**馬具**，後來引申出重要的動詞用法：**駕馭**，因此也有人翻譯成駕馭工程。從字根可以了解，這個字本身就帶有「把一股巨大但難以控制的力量導引到對的方向」的味道。

換句話說，業界用 `harness` 來描述新的工程典範絕非隨意挪用，這個比喻準確點出了我們此刻面對 LLM 的處境：模型能力足夠強大，但需要外圍的約束才跑得穩、跑得久。

李宏毅在課堂引用了一個公式：

```
Agent = Model + Harness
```

由於 LLM 本質上是一個機率模型，因此單純依賴模型自身的判斷往往不夠可靠；harness engineering 就是把模型外的所有 **runtime 基礎設施**（工具編排、權限邊界、回饋迴路、可觀測性、人類檢查點）系統化整合起來的工程紀律。

### Harness 具體包含哪些元件？

把這套工程紀律拆開來看，在 coding agent 的脈絡下，一套完整的 harness 通常會涵蓋以下幾類元件：

- **系統提示（system prompt）**：規範 agent 的基本運作方式與行為邊界
- **工具集（tools）**：檔案讀寫、shell、搜尋、測試執行、程式碼修改等可呼叫的能力
- **工具說明（tool descriptions）**：模型實際看到的工具用途、參數 schema 與使用範例
- **中介層（middleware）**：工具呼叫前後的攔截、權限檢查、結果修正與日誌處理
- **記憶（memory）**：短期工作記憶、跨會話的長期記憶與經驗沉澱
- **上下文管理（context management）**：對 context window 的壓縮、裁切與召回策略
- **執行環境（execution environment）**：sandbox、權限隔離與運行時的資源限制
- **評估與可觀測性（evaluation / observability）**：自動化測試、trace、log、reward 訊號、失敗報告與回歸紀錄


![62ce6425-0989-4ddb-8a1a-2a0c81d7a937](https://hackmd.io/_uploads/BkNczzeyzl.png)

就像上圖這些元件平時都隱身在 agent 的外圍，使用者多半感受不到它們的存在；但每一條都是讓模型能跑得穩、跑得久的關鍵基礎設施。後文要介紹的「五大支柱」，其實就是把這些元件再進一步收斂出來的功能性責任分組。

## prompt engineering：管理模型前的文字介面

回到最早的 prompt engineering 階段，整個工程的焦點在於**模型前的文字介面**。

我們可以條列這個階段的核心技巧：

- **角色扮演**：賦予模型特定身分，讓回應更聚焦
- **zero shot / one shot / few shot**：依問題複雜度提供範例
- **特化標記語法**：例如 Claude 模型對 XML 標籤、`---` 與 `"""` 三引號有針對性的訓練最佳化
- **CoT（Chain of Thought）思維鏈**：要求模型展示推理過程
- **reasoning model**：演進到由模型自動決定是否需要展開思考

這個階段大家在意的是「我們該怎麼問」，所有技巧都圍繞著輸入端打轉。至於「模型該知道什麼」「模型該怎麼運作」這些更深的問題，要等到後面的階段才會被處理。

即使到了 2026 年，prompt engineering 依然是基礎中的基礎，社群長期維護了完整的 [Prompt Engineering Guide](https://www.promptingguide.ai/zh)，而 [OpenAI](https://developers.openai.com/api/docs/guides/prompt-guidance)、[Google Cloud](https://cloud.google.com/discover/what-is-prompt-engineering) 與 [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) 等主要前沿模型廠商也都各自維護著官方的 prompt 指南。這幾份文件至今仍持續更新，足以證明這個階段累積下來的技巧並未過時，反而是進入後續 context engineering 與 harness engineering 的必備底座。

## context engineering：管理進入 context window 的所有資訊

隨著應用情境變得複雜，單靠 prompt 顯然不夠，模型回答品質很大程度取決於它「能看到什麼」。於是焦點從 prompt 本身，外推到**所有會進入或影響 context window 的資訊**。

「Context engineering」這個詞由 **Andrej Karpathy** 與 Shopify CEO Tobi Lütke 在 2025 年中前後推廣，並迅速成為 AI 工程界的通用語彙。Karpathy 對它的定義非常精準 —

> *the delicate art and science of filling the context window with just the right information for the next step.*
>
> （在每一步推論時，把恰到好處的資訊填進 context window，是一門精緻的藝術，也是一門科學。）

### 五個核心組成元件

業界對 context 的拆解有多種版本，最常被引用的是以下五項：

1. **系統提示（System prompt）**：定義模型行為的初始指令與護欄
2. **使用者輸入（User prompt）**：當下這一輪的真正請求
3. **記憶（Memory）**：跨會話的長期記憶與本次會話的短期歷史
4. **檢索（RAG）**：從外部知識庫拉進來的相關文件
5. **工具（Tools）**：模型可呼叫的函式定義與其執行結果

### 四種實踐策略：Write / Select / Compress / Isolate

[LangChain](https://blog.langchain.com/context-engineering-for-agents/) 在一篇部落格談論時把 context engineering 的實作手法整理成四個動詞：

- **Write（寫入）**：把不該佔住 context window 的訊息（中間運算、決策紀錄）寫到外部存放，例如暫存器、長期記憶資料庫
- **Select（選擇）**：在需要時透過相似度檢索（RAG / embedding）動態拉進來
- **Compress（壓縮）**：在 context 變長時做摘要、修剪冗餘 token
- **Isolate（隔離）**：透過 sub-agent 把工作拆到獨立的 context window，避免相互干擾

Anthropic 在多代理研究系統中示範了這四個動詞的完整應用：主導 agent 負責路由與彙整，多個專門 sub-agent 各自應用 RAG（Select）、scratchpad（Write）、摘要（Compress），整個架構本身就是 Isolate 的具體實踐。

值得一提的是，**MCP（Model Context Protocol）** 正是 context engineering 在工具與資源取用這一環的標準化實現，它讓 tools 與外部資源能透過統一介面被 agent 接取，是 context engineering 生態系中重要的基礎協定。

### Context engineering 的隱憂：context rot

值得一提的是，2026 年隨著模型 context window 1 Million token，業界開始注意到 **「context rot」（上下文腐化）** 現象：把過多低品質資訊塞進 context，反而會拉低模型表現。換言之，context engineering 的真正功夫不在「能塞多少」，而在「該塞什麼、什麼時候裁掉」。這個觀察也直接引出了下一節 harness engineering 必須處理的「上下文衰減」問題。

那 context engineering 到底在解決什麼問題？簡單講，就是替模型管理「每一輪推論該看到什麼」。它透過外部記憶的導入與裁剪，把問題從「該怎麼問」推進到「該讓模型知道什麼」。

## harness engineering：管理整個 agent runtime 與驗證治理

當 agent 開始跨多輪、跨會話、長時間運作時，光是把資訊塞進 context window 已經不足以保證結果，我們需要的是一整套**運行時治理系統**。

Anthropic 在《Effective Harnesses for Long-Running Agents》中指出，long-running agent 常見的三種失敗模式是：

- **上下文衰減（context decay）**：隨著 context 填滿，模型在冗長任務中逐漸失去連貫性
- **自我評估偏差（self-eval bias）**：模型評估自己工作時傾向給出正面回饋，即使品質明顯不佳
- **上下文焦慮（context anxiety）**：模型在接近 context 上限時，會「自動」提前結束工作

這些問題寫再好的 prompt、塞再多 context 也無法解決，必須靠**模型之外**的機制：例如把規劃、執行、評估拆給不同角色的 agent；例如在每個 feature 完成後強制 git commit；例如建立明確的「完成定義」合約。

如果說 prompt engineering 是教 AI「怎麼說話」、context engineering 是替它整理「該看的東西」，那 harness engineering 就是替它打造「能跑得穩、跑得久的工作環境」。它解決的問題已經從輸入或資訊，擴張到「整個系統該怎麼運作才能可靠」。

## 三者的差別：巢狀結構，而非取代

值得注意的是，這三個階段呈現**巢狀結構**，後者把前者整個包進來，往外擴張了關注的範圍：


![9dd89138-4154-440f-bc2a-cdb01146a486](https://hackmd.io/_uploads/BJ2ZQzlJzx.png)

換句話說，做 harness engineering 不代表可以不寫好 prompt；做 context engineering 也不代表可以放任 prompt 隨便寫。每一層都假設前一層已經做好了。

我們可以用一張小表格回顧三者的責任邊界：

| 階段                | 操作層級      | 主要時期    | 一句話定位                |
| ------------------- | ------------- | ----------- | ------------------------- |
| Prompt engineering  | message-level | 2022 – 2024 | 管模型前的文字介面        |
| Context engineering | session-level | 2025        | 管推論時的所有資訊流      |
| Harness engineering | system-level  | 2026+       | 管整個 agent runtime 治理 |

## 為什麼需要 harness engineering？三組數據告訴你

讀到這裡，可能有讀者會問 — 既然模型一代比一代強，為什麼還需要這麼多外圍工程？答案藏在以下三組數據裡。

**第一組：Anthropic 的對照實驗**。他們在製作遊戲開發工具時，使用 Opus 4.5 配上單一代理跑了 20 分鐘、花費 9 美元，結果無法實現核心功能；換成完整的 harness 架構後，雖然跑了 6 小時、花費 200 美元，但交付的成品品質達到「**20 倍更優質**」的水準。

**第二組：LangChain 與第三方研究的測試**。在**模型完全相同**的前提下，只調整 harness 配置，agent 的任務成功率從 **52.8% 提升到 66.5%**；另一份研究則記錄到從 **42% 飆升到 78%** 的更顯著差距。

**第三組：產業實例 Stripe**。Stripe 工程團隊每週合併**約 1,300 個 AI 生成的 PR**，這個量級單靠 prompt 技巧根本撐不起來，背後是一套高度成熟的 harness 系統：linter 強制阻擋不合規的 PR、結構化的 spec、跨多會話的進度追蹤、自動回滾機制。

由於這些數據幾乎都來自業界第一線的真實場景，harness engineering 早已超出學術名詞的範疇，成為**直接決定 AI 投資能否落地的工程能力**。

## 如何實作 harness engineering？五大支柱

那麼具體要怎麼做？綜觀 Martin Fowler、LangChain、OpenAI、Anthropic 與其他多份產業整理（包含 `awesome-harness-engineering` 這份開源清單），業界對 harness 的拆解雖然細節各有差異，但收斂下來幾乎都包含五個共同支柱。我們可以借用這個收斂後的框架作為起手。

在進入五大支柱之前，先記住一個由 Martin Fowler 與多位實踐者反覆強調的**雙向控制觀念**：

- **Guides（前饋控制）**：在 agent 採取行動「之前」就引導它走向正確方向（例如 system prompt、AGENTS.md、權限邊界）
- **Sensors（回饋控制）**：在 agent 採取行動「之後」觀察結果，幫助它自我修正（例如 linter、測試、telemetry）

底下的五大支柱，每一個都可以對應到「前饋」或「回饋」的角色。

### 一、工具編排（Tool Orchestration）

明確定義 agent 能存取哪些工具、能進入哪些資源、能執行哪些動作。每個工具都帶有權限邊界，避免 agent 越界操作。業界範例：

- **Claude Code**：採取**預設只讀、寫入需顯式批准**的策略，並以 hooks 系統把工具呼叫攔截到自訂腳本中
- **OpenAI Codex / Responses API**：把工具定義與模型介面整合得更緊密，並以 `AGENTS.md` 作為機器可讀的「工具用法說明書」

### 二、安全防護（Safety Guardrails）

在工具之上再疊一層：權限驗證、速率限制、輸入合法性檢查、輸出過濾、**沙箱隔離（sandbox）**。其中沙箱隔離確保 agent 的所有操作都在受限的執行環境內完成，即使出現意外行為也不會波及真實系統。OpenAI 在 2026 年 4 月公開的整理中提到的**分層防護模式**包含：輸入驗證、輸出過濾、工具風險分級、人工干預觸發條件。例如連線生產資料庫前必須通過特定的人類確認、金鑰只能透過受控的環境變數注入。

### 三、錯誤恢復（Error Recovery）

包含自動重試、自驗證迴路、回滾機制三件套。常見的實作策略是**每完成一小步就立刻 commit，建立可回滾的起點**。Anthropic 要求 agent 一次只處理一個 feature、每完成一個就強制 `git commit`；如此一來，即使後續操作出錯，也能乾淨地回到上一個正確的狀態。

### 四、可觀測性（Observability）

這是 harness engineering 與傳統 DevOps 最相通的支柱：沒有可觀測性就沒有控制。具體要記錄的至少包含：每一次工具呼叫的執行軌跡（trace）、token 與成本、任務完成率、失敗模式分布。

需要注意的是，可觀測性的目的不只是事後排查，而是要支撐**回饋閉環**：agent 產出 → harness 驗證 → telemetry 收集 → 回饋更新 harness → agent 再次嘗試。

### 五、人類檢查點（Human Checkpoints）

最後也最關鍵的支柱 — **不是要消除人類，而是要把人類保留在最有價值的節點**。

由於 agent 撰寫程式碼的速度實在太快了，**審查反而成為人類的新瓶頸**；因此如果我們把人類擺在每一個節點，整體的產出效率會直接被人類的注意力上限拉低。換句話說，harness engineering 的人類檢查點要追求「準」而非「多」，我們應該把人類保留在**需求定義、風險判斷、評測校準與規則設計**這四件高價值的事情上，把低價值的重複性操作交給 harness 自動化。

OpenAI 在公開指南中也明確列出哪些動作必須觸發人工核可：**任何接觸生產資料、修改基礎設施、變更安全設定**的操作。這幾條紅線，可以作為實作人類檢查點時的起手清單。

## 實際案例：Anthropic 的雙層架構

把上述五大支柱兜在一起，Anthropic 的實作可以視為最具參考價值的範本。整個架構分為兩個 agent：

**初始化代理（init agent）**：只負責一件事：把後續工作所需的環境準備好。具體輸出包含：

- `init.sh`：啟動開發伺服器的腳本
- `claude-progress.txt`：跨會話的進度日誌
- 初始 `git commit`：建立可回滾的起點
- **feature manifest JSON**：上百條每條一句敘述的功能清單，初始狀態全為「未完成」

**編碼代理（coding agent）**：後續每次會話進來，固定的開場流程是：

1. 執行 `pwd` 確認工作目錄
2. 讀取 git log 與進度日誌
3. 從 feature manifest 挑出最優先的未完成項目
4. 啟動開發伺服器、跑基本的 end-to-end 測試
5. 開始處理一個 feature、處理完成後 `git commit` 並更新進度

更進一步，Anthropic 引入了**GAN 啟發的三代理架構**：Planner（規劃者）負責把簡短的需求展開為完整規格、Generator（生成者）負責迭代開發、Evaluator（評估者）透過 Playwright 之類的自動化工具實際操作應用驗證功能；三者之間還會協商**衝刺合約（sprint contract）**，在編碼前先寫清楚「完成」的具體驗收標準。

## 我們可以怎麼做？三個立即可行的起手式

如果你正準備在自己的專案中導入 harness engineering 的概念，我們可以從三個成本最低的起手式開始：

**起手式一：把 agent 看不到的東西全部落地成 in-repo artifact**。從 agent 的視角來看，**它在 context 裡看不到的東西就等於不存在**。因此 spec、規則、進度、決策紀錄都應該寫成版本控制下的檔案，例如 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules`。

**起手式二：把規範從 prompt 改為確定性約束**。寫一段 prompt 要求 agent「請遵守 ESLint 規則」是**機率性**的，但寫一個 pre-commit hook 直接禁止掉不合規的 commit 是**確定性**的。可以靠工具強制執行的事，就不要交給 prompt 提醒。

**起手式三：建立最小可觀測性，包含一份進度日誌、一份功能清單、一個 git 歷史**。不必一開始就上完整的 telemetry pipeline，光是這三樣東西，就能讓 agent 在跨會話之間順暢交接，也讓人類審查時能快速定位「現在到哪了、漏了什麼」減少 Review 瓶頸。

至於更進階的支柱：多代理協作、衝刺合約、自動演化（AHE），都可以在這三個基礎穩定之後再漸漸補上。

### 補充說明
> - **多代理協作（multi-agent collaboration）**：把 Planner、Generator、Evaluator 等角色拆給不同 agent 分工，讓規劃、執行、驗證在彼此隔離的 context 中進行，避免單一模型既當球員又當裁判
> - **衝刺合約（sprint contract）**：開工前先把這一輪的「完成定義」與驗收標準寫成明確契約，避免 agent 自己解釋成功、自己宣告完成
> - **自動演化（AHE，Agentic Harness Engineering）**：透過 telemetry 與評估資料自動回饋更新 harness 本身（規則、提示、權限），讓整個系統具備隨任務累積自我改進的能力

## 總結

當然，我們也可以反過來追問 — 把 prompt engineering 做好算不算一種 harness？是。把 context engineering 做好算不算一種 harness？也是，它們本質上都是為了讓模型跑得更穩，而從模型外部疊上的約束。但當我們刻意拿出這三個詞彙來區分時，真正關注的焦點其實不同

回到最開頭那個騎師與馬的比喻：prompt engineering 像是教騎師怎麼下口令、context engineering 像是替馬準備合適的飼料與環境，而 harness engineering 就是整副馬具與訓練體系。我們關心的問題也跟著從「該怎麼問」、「該知道什麼」，一路擴張到「整個系統該怎麼運作」。

三者其實是疊在一起運作的。即使未來模型能力再強大，harness 也不會消失，它只會**演化**，漸進簡化掉非必要組件、保留真正能補足模型限制的部分。

對開發者而言，最重要的心法或許是 — **保留人類在高價值節點，而不是每個節點**。讓 harness 處理重複、可驗證、低價值的工作，把我們的判斷力集中在需求、風險與評測上，避免讓「審查」成為整個系統的新瓶頸。

希望以上對大家有所幫助，如有錯誤歡迎糾正。

## 參考資料

- **Context engineering**
  - [Context Engineering — ihower](https://ihower.tw/blog/12817-context-engineering)
  - [Andrej Karpathy on context engineering — X / Twitter](https://x.com/karpathy/status/1937902205765607626)
  - [Context Engineering for Agents — LangChain Blog](https://blog.langchain.com/context-engineering-for-agents/)
  - [What Is Context Engineering? — IBM](https://www.ibm.com/think/topics/context-engineering)
  - [Context Engineering: Bringing Engineering Discipline to Prompts — Addy Osmani](https://addyo.substack.com/p/context-engineering-bringing-engineering)
  - [Context Engineering 101: What We Can Learn from Anthropic](https://omnigeorgio.beehiiv.com/p/context-engineering-101-what-we-can-learn-from-anthropic)
- **Harness engineering 概論**
  - [Harness Engineering — OpenAI](https://openai.com/zh-Hant/index/harness-engineering/)
  - [Harness Design for Long-Running Apps — Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps)
  - [Effective Harnesses for Long-Running Agents — Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
  - [Harness engineering for coding agent users — Martin Fowler](https://martinfowler.com/articles/harness-engineering.html)
  - [What is Harness Engineering: Complete Guide 2026 — nxcode](https://www.nxcode.io/resources/news/what-is-harness-engineering-complete-guide-2026)
  - [Harness engineering: Structured workflows for AI-assisted development — Red Hat](https://developers.redhat.com/articles/2026/04/07/harness-engineering-structured-workflows-ai-assisted-development)
  - [Agentic Harness Engineering: Observability-Driven Automatic Evolution (arXiv)](https://arxiv.org/abs/2604.25850)
- **Agent harness 架構**
  - [The Anatomy of an Agent Harness — LangChain](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)
  - [What Is an Agent Harness? Architecture Behind Claude Code, Codex, Cursor — MindStudio](https://www.mindstudio.ai/blog/what-is-agent-harness-architecture-explained)
  - [Continually improving our agent harness — Cursor](https://cursor.com/blog/continually-improving-agent-harness)
  - [What is an AI Agent Harness? 5 Core Pillars — Aiquinta](https://aiquinta.ai/blog/agent-harness-5-core-pillars-and-how-to-build/)
- **其他**
  - [How Stripe Ships 1,300 AI PRs a Week — MindStudio](https://www.mindstudio.ai/blog/what-is-harness-engineering-beyond-prompt-context-engineering)
  - [awesome-harness-engineering](https://github.com/walkinglabs/awesome-harness-engineering)

