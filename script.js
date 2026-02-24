// 移动菜单交互
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// 平滑滚动
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // 关闭移动菜单
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// 图片画廊交互
const galleryImages = document.querySelectorAll('.gallery-grid img');

// 创建图片查看器
function createImageViewer() {
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10;
    `;
    
    viewer.appendChild(img);
    viewer.appendChild(closeBtn);
    document.body.appendChild(viewer);
    
    return { viewer, img, closeBtn };
}

const { viewer, img, closeBtn } = createImageViewer();

// 打开图片查看器
galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        img.src = this.src;
        viewer.style.opacity = '1';
        viewer.style.visibility = 'visible';
        img.style.transform = 'scale(1)';
        document.body.style.overflow = 'hidden';
    });
});

// 关闭图片查看器
function closeViewer() {
    viewer.style.opacity = '0';
    viewer.style.visibility = 'hidden';
    img.style.transform = 'scale(0.8)';
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeViewer);

viewer.addEventListener('click', function(e) {
    if (e.target === viewer) {
        closeViewer();
    }
});

// 联系表单提交
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // 简单验证
        if (!name || !email || !message) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 模拟表单提交
        alert('留言提交成功！我们会尽快与您联系。');
        this.reset();
    });
}

// 滚动时的元素动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-item, .food-item, .about-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始化元素样式
function initElementStyles() {
    const elements = document.querySelectorAll('.feature-item, .food-item, .about-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// 导航栏滚动效果
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 页面加载完成后初始化
window.addEventListener('load', function() {
    initElementStyles();
    animateOnScroll();
    navbarScrollEffect();
});

// 滚动时执行动画
window.addEventListener('scroll', animateOnScroll);

// 添加移动菜单的CSS样式
const style = document.createElement('style');
style.textContent = `
    /* 移动菜单样式 */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: #fff;
            flex-direction: column;
            align-items: center;
            padding: 30px 0;
            gap: 20px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);