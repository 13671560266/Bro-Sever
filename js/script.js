// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const engineBtns = document.querySelectorAll('.engine-btn');
    
    // 当前选中的搜索引擎
    let currentEngine = 'baidu';

    // 搜索引擎URL模板
    const engineUrls = {
        baidu: 'https://www.baidu.com/s?wd=',
        bing: 'https://cn.bing.com/search?q=',
        google: 'https://www.google.com/search?q='
    };

    // 切换搜索引擎
    engineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            engineBtns.forEach(b => b.classList.remove('active'));
            // 给当前按钮添加active类
            this.classList.add('active');
            // 更新当前搜索引擎
            currentEngine = this.dataset.engine;
        });
    });

    // 搜索函数
    function search() {
        const keyword = searchInput.value.trim();
        // 验证关键词是否为空
        if (!keyword) {
            alert('请输入搜索关键词！');
            searchInput.focus();
            return;
        }
        // 拼接搜索URL并打开
        const searchUrl = engineUrls[currentEngine] + encodeURIComponent(keyword);
        window.open(searchUrl, '_blank');
    }

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', search);

    // 回车键触发搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            search();
        }
    });

    // 热门搜索点击事件
    const hotItems = document.querySelectorAll('.hot-item');
    hotItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // 将热门关键词填入输入框
            searchInput.value = this.textContent;
            // 执行搜索
            search();
        });
    });
});