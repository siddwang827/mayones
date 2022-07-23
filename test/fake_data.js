const roles = [
    {
        id: 0,
        name: "admin"
    },
    {
        id: 1,
        name: "employee"
    },
    {
        id: 2,
        name: "employer"
    }
]

const users = [
    {
        username: "Dcard",
        email: 'dcard@test.com',
        password: "1qaz2wsx",
        role_id: 2,
    },
    {
        username: 'Appworks',
        email: 'appworks@test.com',
        password: "1qaz2wsx",
        role_id: 2,
    },
    {
        username: 'Sidd',
        email: 'siddwang@test.com',
        password: "1qaz2wsx",
        role_id: 1,
    },
    {
        username: 'Alice',
        email: 'alicechin@test.com',
        password: "1qaz2wsx",
        role_id: 1,
    }
]

const category_position =
    [
        { category: '軟體開發', position: '後端工程', view_order: 1 },
        { category: '軟體開發', position: '前端工程', view_order: 1 },
        { category: '軟體開發', position: '全端工程', view_order: 1 },
        { category: '軟體開發', position: '測試工程', view_order: 1 },
        { category: '軟體開發', position: '遊戲開發', view_order: 1 },
        { category: '軟體開發', position: '行動裝置開發', view_order: 1 },
        { category: '軟體開發', position: 'DevOps / SRE', view_order: 1 },
        { category: '軟硬體系統整合', position: '韌體 / 電子電路', view_order: 2 },
        { category: '軟硬體系統整合', position: '硬體工程', view_order: 2 },
        { category: '軟硬體系統整合', position: '半導體', view_order: 2 },
        { category: '軟硬體系統整合', position: '光電工程', view_order: 2 },
        { category: '資料工程', position: '資料工程 / 機器學習', view_order: 3 },
        { category: '系統與基礎架構', position: 'MIS / 網路管理', view_order: 4 },
        { category: '系統與基礎架構', position: '通訊電信', view_order: 4 },
        { category: '行銷 / 企劃 / 內容', position: '行銷企劃 / 社群經營', view_order: 5 },
        { category: '行銷 / 企劃 / 內容', position: '編輯 / 內容經營', view_order: 5 },
        { category: '行銷 / 企劃 / 內容', position: '廣告創意 / 企劃', view_order: 5 },
        { category: '行銷 / 企劃 / 內容', position: '攝影 / 影音製作', view_order: 5 },
        { category: '行銷 / 企劃 / 內容', position: 'Growth Hacker', view_order: 5 },
        { category: '行銷 / 企劃 / 內容', position: '媒體公關 / 宣傳採買', view_order: 5 },
        { category: '營運', position: '人資', view_order: 6 },
        { category: '營運', position: '財務 / 會計', view_order: 6 },
        { category: '營運', position: '行政', view_order: 6 },
        { category: '營運', position: '營運', view_order: 6 },
        { category: '營運', position: '客戶服務', view_order: 6 },
        { category: '營運', position: '法務', view_order: 6 },
        { category: '市場開發', position: '商業開發', view_order: 7 },
        { category: '市場開發', position: '通路開發', view_order: 7 },
        { category: '市場開發', position: '實體經營', view_order: 7 },
        { category: '市場開發', position: '市場分析', view_order: 7 },
        { category: '市場開發', position: '銷售業務', view_order: 7 },
        { category: '產品 / 設計', position: '專案 / 產品管理', view_order: 8 },
        { category: '產品 / 設計', position: 'UIUX / 視覺設計', view_order: 8 },
        { category: '產品 / 設計', position: '3D / 動畫設計', view_order: 8 },
        { category: '其他', position: '教育 / 教學', view_order: 9 },
        { category: '其他', position: '研究人員', view_order: 9 },
        { category: '其他', position: '其他', view_order: 9 }
    ]

const categories = [
    { category: '網路', counts: null },
    { category: '教育 / 線上課程', counts: null },
    { category: 'FinTech', counts: null },
    { category: '行銷 / 媒體 / 廣告', counts: null },
    { category: '旅遊', counts: null },
    { category: '軟體開發', counts: null },
    { category: '實體零售', counts: null },
    { category: '半導體', counts: null },
    { category: '生物 / 醫療科技', counts: null },
    { category: '運動 / 健康', counts: null },
    { category: '社會企業', counts: null },
    { category: '電商 / O2O', counts: null },
    { category: '設計 / 文創', counts: null },
    { category: '物聯網 / 硬體', counts: null },
    { category: 'VR / 動畫 / 遊戲', counts: null },
    { category: 'SaaS / 商務服務', counts: null },
    { category: '娛樂媒體', counts: null },
    { category: '金融', counts: null },
    { category: '服務 / 物業管理', counts: null },
    { category: '資訊安全', counts: null }
]

const locations = [
    { name: "台北市", view_order: 1 },
    { name: "新北市", view_order: 2 },
    { name: "桃園市", view_order: 3 },
    { name: "新竹市", view_order: 4 },
    { name: "新竹縣", view_order: 5 },
    { name: "台中市", view_order: 6 },
    { name: "彰化縣", view_order: 7 },
    { name: "嘉義市", view_order: 8 },
    { name: "台南市", view_order: 9 },
    { name: "高雄市", view_order: 10 },
    { name: "花蓮縣", view_order: 11 },
    { name: "海外", view_order: 12 }
]

const tags = [
    { tag_name: 'Python', classification: 'job', counts: 55 },
    { tag_name: 'JavaScript', classification: 'job', counts: 21 },
    { tag_name: 'React', classification: 'job', counts: 24 },
    { tag_name: 'C++', classification: 'job', counts: 3 },
    { tag_name: 'Ruby', classification: 'job', counts: 13 },
    { tag_name: 'Golang', classification: 'job', counts: 11 },
    { tag_name: 'HTML/CSS', classification: 'job', counts: 52 },
    { tag_name: 'Linux', classification: 'job', counts: 10 },
    { tag_name: 'AWS', classification: 'job', counts: 4 },
    { tag_name: 'Docker', classification: 'job', counts: 2 },
    { tag_name: 'SQL', classification: 'job', counts: 9 },
    { tag_name: 'NoSQL', classification: 'job', counts: 6 },
    { tag_name: 'Redis', classification: 'job', counts: 11 },
    { tag_name: '電商', classification: 'company', counts: 21 },
    { tag_name: '跨國團隊', classification: 'company', counts: 5 },
]

const companies = [
    {
        owner_id: 1,
        brand: "Dcard",
        website: "https://www.dcard.tw/f",
        category: "網路",
        short_description: "Dcard 是新世代最具影響力的社群媒體，重新定義了人與人之間的交流方式。快來加入我們，一起定義下個世代！",
        company_location: "台北市",
        company_address: "臺北市大安區光復南路102號14樓",
        introduction: "<p>「讓每個人找到共鳴。」<br><br>Dcard 結合科技與人文搭起一座橋樑，豐富每個人的生活、讓每個人找到共鳴。面對快速變化的網路生態，Dcard 聚焦長期使命願景、年度戰略，夥伴們專注在公司戰略與目標，用成長型思維打造一個快速成長也充滿溫度的企業文化。<br><br>Dcard 致力於打造讓人放心分享自己故事的場域，讓平凡人分享不平凡故事的新世代服務。Dcard 是全台最大的匿名社群，在年輕族群有極高滲透率與影響力。不止步於台灣社群取得極大影響力，我們正全力擴張版圖，強力發展廣告、電商、IP 新型業務及跨國市場，持續往世界級網路公司的目標努力。<br><br>我們的服務範圍擴及台灣 (Dcard)、香港 (Dcard.HK)及日本 (Dtto)，持續擴大海外市場影響力。我們希望能邀請優秀的你加入團隊，把你的名字列在我們下一個里程碑的故事裡！<br>&nbsp;</p><p>六個你會愛上 Dcard 的理由：<br><br>▌討論合作的文化<br>我們相信夥伴多方交流及討論可以創造出更多不一樣的火花跟可能性。在 Dcard 我們傾聽也重視每個夥伴的想法，每天專案小組進度會議、每週產品會議、每月 All Hands Meeting 中，夥伴們彼此對齊進度，主動提出想法，做更完善的決策與行動。透過夥伴的溝通合作，互相激盪火花，幫助團隊打造更棒的產品！<br><br>▌充沛的學習資源<br>我們相信跟一群優秀的夥伴共事，絕對是最棒的福利！ 為了在快速變動、充滿挑戰的環境中取得影響力，我們需要勇於面對未知的挑戰。Dcard 重視夥伴的成長，我們提供各類書籍、講座、國內外研討會及專屬語言進修課程等資源，成為夥伴學習路上最大的後盾！<br><br>▌高速成長的環境<br>不止步於在台灣社群取得極大影響力，Dcard 正全力擴張版圖，發展廣告、電商、IP 新型業務及跨國市場產品，持續往世界級網路公司的目標努力。在這裡，你將能親身參與各類新想法、新產品甚至是新市場的誕生！<br><br>▌投注熱情的團隊<br>我們是多元背景的跨國團隊。夥伴們充滿熱情，專注在不同領域，用成長型思維打造快速成長的團隊，提供社群、廣告、電商、跨國等不同服務給使用者。<br><br>▌創造影響的舞台<br>在這個變化快速的場域，夥伴有多方嘗試的機會，可以參與各類新想法、新產品甚至是新市場的誕生！ 只要你有能力和意願，站出來，你就可以親自做出改變。<br><br>▌彈性的工作氛圍<br>混合工作的模式（Hybrid Work），Dcard 夥伴能彈性安排工作時間與空間。具有彈性的遠距工作日（Remote Day），在辦公室也可以選擇在任何小角落工作。讓你自在挑選想要工作的時間和地方！</p>",
        philosophy: "<p>以「讓每個人找到共鳴」為使命，Dcard 致力於讓使用者在各個領域都能獲得價值。<br><br>Dcard 產品從抽卡延伸至社群、廣告、電商、跨國市場等、服務對象從大學生到所有年輕人。我們正在以成長型思維打造一個快速成長、持續擴展影響力的組織。團隊聚焦長期使命願景與戰略，專注目標並持續突破。<br><br>我們面向世界，在不同領域創造更多的發展與機會。不滿足於現有版圖，我們需要你的加入，幫助 Dcard 在更多領域提供價值給更多使用者！<br>&nbsp;</p>",
        story: "",
        benifit: "<p>▌年度休假<br>享有優於法律的年假、不扣薪病假、生日假和特殊假期（Dcard 日等），休息是為了走更長遠的路。<br><br>▌工作環境<br>自由明亮的工作空間，舒適的工作配備，寬敞的辦公室，甚至還有床協助夥伴補充體力。<br><br>▌彈性氛圍<br>彈性的 Remote Work，夥伴可以自主安排工作的時間與地點，更多的彈性，創造不同的可能性！<br><br>▌團隊保險<br>全面性團體保險及完整健康檢查，每一項都為了更體貼夥伴的健康需求。<br><br>▌團隊慶祝<br>節慶派對、午餐日、尾牙、每週夥伴分享等團隊活動，我們重視每個相聚的機會！<br><br>▌有趣活動<br>水果日 、手搖杯日、個人按摩、各類運動課程、專屬的 Dcard Buddy Program 等，和夥伴一起享受 Dcard 生活！<br><br><br>▌學習資源<br>我們從夥伴們的需求出發培育夥伴，提供無上限學習資源（書籍、講座、課程補助），夥伴可以直接提出需求，並在 24 小時內即可取得。<br><br>不定期和企業顧問合作、舉辦講師內訓，提供國內外 Conference 補助，如 WWDC、Google I/O ⋯，且邀請業界高手來到 Dcard 分享，不定期拜訪其他公司互相交流。我們鼓勵各部門舉辦讀書會、每月舉辦一次 Developer Session，不定期舉辦不同主題的工作坊等。</p>",
        logo_image: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/logo/901b6f88-bee9-4982-92db-cc96d2a197bd-1658070832141.png",
        banner_image: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/banner/90732efe-fda6-41a5-a550-f6953243bd0e-1658070833828.png",
    },
    {
        owner_id: 2,
        brand: "Appworks",
        website: "https://school.appworks.tw/",
        category: "教育 / 線上課程",
        short_description: "一個人走得快，一群人走得遠，加入我們一起培育科技軟體人才！ ",
        company_location: "台北市",
        company_address: "台北市中正區仁愛路二段99號",
        introduction: "<p>AppWorks School 自 2016 年以來，持續透過免費、實作導向式的全日制訓練，培訓業界最需要的軟體工程師，同時幫助積極熱情的台灣年輕人轉職。 五年來，AppWorks School 已培訓超過 500&nbsp;位學員、90% 成功拿到工程師工作，是台灣新時代教育機構的領頭羊。如果你對人才培育有熱情、有想法，想要翻轉教育、實踐理想，歡迎你加入我們！</p>",
        philosophy: "<p>在 AppWorks School，我們認為成為軟體工程師不僅是要將技術學好，更重要的是學習解決問題的能力，也就是在遇到問題時，是否能夠定義問題、尋找資源並進一步解決問題。因此，我們採用翻轉式的學習，不會有老師在課堂上授課，相反的，會有導師在一旁引導並協助學員一步步建立起解決問題的能力。</p>",
        story: "",
        benifit: "<ul><li>全日免費咖啡/零食/茶包</li><li>定期團隊聚餐</li><li>年度員工旅遊</li><li>年度員工健康檢查</li><li>生育補助</li></ul>",
        logo_image: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/logo/f8651d0c-eda5-4faa-af04-08faf58bb14d-1658213665086.png",
        banner_image: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/banner/39872bcb-cc4d-44cb-a481-2d2c06339b54-1658213666707.png",
    }
]

const other_images = [

    {
        other_iamge: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/others/cb491cc2-04ad-44b7-8d33-d0831c62ff28-1658070835921.png",
        companies_id: 1
    },
    {
        other_iamge: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/others/fc0a1d9c-86e3-4260-9af2-c54110153905-1658070835921.png",
        companies_id: 1
    },
    {
        other_iamge: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/others/66bd0d8e-0543-4dbc-97ca-428e5a070fb2-1658070835921.png",
        companies_id: 1
    },
    {
        other_iamge: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/others/19621de7-943b-490d-a7fd-8e4378d5a066-1658373621631.png",
        companies_id: 2
    },
    {
        other_iamge: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/others/e1e94b05-3907-4dae-ab88-25331e7ba7ae-1658373621631.png",
        companies_id: 2
    },
    {
        other_iamge: "https://d1nuybrlgvaihx.cloudfront.net/upload/company/others/5ec52734-2573-49da-973b-98a58a7fdb94-1658373621631.png",
        companies_id: 2
    }
]

const companies_tags = [
    {
        companies_id: 1,
        tags_id: 12
    },
    {
        companies_id: 1,
        tags_id: 15
    },
    {
        companies_id: 2,
        tags_id: 1
    },
    {
        companies_id: 2,
        tags_id: 3
    }
]

const jobs = [
    {
        owner_id: 1,
        companies_id: 1,
        job_title: "後端工程師",
        job_description: "<p>– 協助新手實作練習、建立正確觀念，培養獨立學習及解決問題能力<br>– 依學員學習狀況與能力，適時提供個人化輔導<br>– 協助班級以及學校活動進行，帶領團體討論、交流<br>– 追蹤技術趨勢及促進社群技術交流，包含校友分享活動或網路分享技術新知<br>– 「不需要」準備大量簡報、進行講座式教學</p>",
        skill_required: "<p>– 具 3 年以上工作經驗<br>– 具基本 HTML5 / CSS3 / JavaScript 知識<br>– 熟悉 Git 版本控制<br>– 熟悉 Linux 基本操作<br>– 熟悉 SQL 資料庫設計<br>– 熟悉 AWS 或 GCP 雲端平台<br>– 熟悉 RESTful API 設計以及第三方 API 串接<br>– 熟悉任一後端語言及框架 (Java, Python, Golang, Node.js, C#)</p>",
        prefered_qualification: "<p>– CI/CD 相關經驗<br>– 任一 NoSQL 使用經驗<br>– 壓力測試與分散式伺服器架構經驗</p>",
        salary_bottom: 80000,
        salary_top: 110000,
        salary_type: "月薪",
        job_type: "全職",
        location: "台北市",
        address: "臺北市大安區光復南路102號14樓",
        remote_work: "部分遠端工作",
        category_position_id: 1,

    },
    {
        owner_id: 1,
        companies_id: 1,
        job_title: "前端工程師",
        job_description: "<p>– 協助新手實作練習、建立正確觀念，培養獨立學習及解決問題能力<br>– 依學員學習狀況與能力，適時提供個人化輔導<br>– 協助班級以及學校活動進行，帶領團體討論、交流<br>– 追蹤技術趨勢及促進社群技術交流，包含校友分享活動或網路分享技術新知<br>– 「不需要」準備大量簡報、進行講座式教學</p>",
        skill_required: "<p>– 具 3 年以上工作經驗<br>– 具基本 HTML5 / CSS3 / JavaScript 知識<br>– 熟悉 Git 版本控制<br>– 熟悉 Linux 基本操作<br>– 熟悉 SQL 資料庫設計<br>– 熟悉 AWS 或 GCP 雲端平台<br>– 熟悉 RESTful API 設計以及第三方 API 串接<br>– 熟悉任一後端語言及框架 (Java, Python, Golang, Node.js, C#)</p>",
        prefered_qualification: "<p>– CI/CD 相關經驗<br>– 任一 NoSQL 使用經驗<br>– 壓力測試與分散式伺服器架構經驗</p>",
        salary_bottom: 60000,
        salary_top: 100000,
        salary_type: "月薪",
        job_type: "全職",
        location: "台北市",
        address: "臺北市大安區光復南路102號14樓",
        remote_work: "部分遠端工作",
        category_position_id: 2,

    },
    {
        owner_id: 2,
        companies_id: 2,
        job_title: "全端工程師",
        job_description: "<p>– 協助新手實作練習、建立正確觀念，培養獨立學習及解決問題能力<br>– 依學員學習狀況與能力，適時提供個人化輔導<br>– 協助班級以及學校活動進行，帶領團體討論、交流<br>– 追蹤技術趨勢及促進社群技術交流，包含校友分享活動或網路分享技術新知<br>– 「不需要」準備大量簡報、進行講座式教學</p>",
        skill_required: "<p>– 具 3 年以上工作經驗<br>– 具基本 HTML5 / CSS3 / JavaScript 知識<br>– 熟悉 Git 版本控制<br>– 熟悉 Linux 基本操作<br>– 熟悉 SQL 資料庫設計<br>– 熟悉 AWS 或 GCP 雲端平台<br>– 熟悉 RESTful API 設計以及第三方 API 串接<br>– 熟悉任一後端語言及框架 (Java, Python, Golang, Node.js, C#)</p>",
        prefered_qualification: "<p>– CI/CD 相關經驗<br>– 任一 NoSQL 使用經驗<br>– 壓力測試與分散式伺服器架構經驗</p>",
        salary_bottom: 70000,
        salary_top: 100000,
        salary_type: "月薪",
        job_type: "全職",
        location: "台北市",
        address: "台北市中正區仁愛路二段99號",
        remote_work: "部分遠端工作",
        category_position_id: 3,

    },
    {
        owner_id: 2,
        companies_id: 2,
        job_title: "測試工程師",
        job_description: "<p>– 協助新手實作練習、建立正確觀念，培養獨立學習及解決問題能力<br>– 依學員學習狀況與能力，適時提供個人化輔導<br>– 協助班級以及學校活動進行，帶領團體討論、交流<br>– 追蹤技術趨勢及促進社群技術交流，包含校友分享活動或網路分享技術新知<br>– 「不需要」準備大量簡報、進行講座式教學</p>",
        skill_required: "<p>– 具 3 年以上工作經驗<br>– 具基本 HTML5 / CSS3 / JavaScript 知識<br>– 熟悉 Git 版本控制<br>– 熟悉 Linux 基本操作<br>– 熟悉 SQL 資料庫設計<br>– 熟悉 AWS 或 GCP 雲端平台<br>– 熟悉 RESTful API 設計以及第三方 API 串接<br>– 熟悉任一後端語言及框架 (Java, Python, Golang, Node.js, C#)</p>",
        prefered_qualification: "<p>– CI/CD 相關經驗<br>– 任一 NoSQL 使用經驗<br>– 壓力測試與分散式伺服器架構經驗</p>",
        salary_bottom: 70000,
        salary_top: 100000,
        salary_type: "月薪",
        job_type: "全職",
        location: "台北市",
        address: "台北市中正區仁愛路二段99號",
        remote_work: "部分遠端工作",
        category_position_id: 4,

    }
]

const jobs_tags = [
    {
        jobs_id: 1,
        tags_id: 3
    },
    {
        jobs_id: 1,
        tags_id: 12
    },
    {
        jobs_id: 2,
        tags_id: 4
    },
    {
        jobs_id: 2,
        tags_id: 10
    },
    {
        jobs_id: 3,
        tags_id: 11
    },
    {
        jobs_id: 3,
        tags_id: 6
    },
    {
        jobs_id: 4,
        tags_id: 14
    },
    {
        jobs_id: 4,
        tags_id: 8
    }
]


module.exports = {
    roles,
    users,
    categories,
    category_position,
    locations,
    tags,
    companies,
    other_images,
    companies_tags,
    jobs,
    jobs_tags
}