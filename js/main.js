document.addEventListener('DOMContentLoaded', () => {
    
    // --- Loading Screen ---
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    }

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Sample Data ---
    const helpData = [
        {
            id: 1,
            type: 'need',
            user: 'Minh Hoàng',
            avatar: 'https://i.pravatar.cc/150?u=minh',
            title: 'Cần mượn máy khoan bê tông',
            desc: 'Tôi cần khoan vài lỗ treo tranh, chỉ dùng trong khoảng 30 phút. Có ai ở khu Block A có không ạ?',
            location: 'Block A - 50m',
            time: '2 giờ trước'
        },
        {
            id: 2,
            type: 'offer',
            user: 'Bác Hùng',
            avatar: 'https://i.pravatar.cc/150?u=hung',
            title: 'Hỗ trợ sửa điện gia dụng nhẹ',
            desc: 'Tôi là thợ điện về hưu, cuối tuần rảnh rỗi muốn giúp hàng xóm kiểm tra dây điện, bóng đèn hỏng.',
            location: 'Block B - 120m',
            time: '5 giờ trước'
        },
        {
            id: 3,
            type: 'need',
            user: 'Linh Chi',
            avatar: 'https://i.pravatar.cc/150?u=chi',
            title: 'Tìm người trông cún chiều nay',
            desc: 'Em có việc bận từ 14h-17h, cần nhờ anh chị nào yêu động vật trông giúp bé Poodle nhà em.',
            location: 'Khu biệt thự - 300m',
            time: '1 giờ trước'
        },
        {
            id: 4,
            type: 'offer',
            user: 'Tuấn Anh',
            avatar: 'https://i.pravatar.cc/150?u=tuan',
            title: 'Cho mượn bộ đồ nghề sửa xe',
            desc: 'Mình có đầy đủ bộ khóa, lục giác, bơm điện. Hàng xóm nào cần sửa xe cứ ghé mình lấy nhé.',
            location: 'Block C - 80m',
            time: '10 giờ trước'
        },
        {
            id: 5,
            type: 'need',
            user: 'Chị Lan',
            avatar: 'https://i.pravatar.cc/150?u=lan',
            title: 'Cần người bê giúp tủ lạnh',
            desc: 'Nhà em mới mua tủ lạnh mà shipper chỉ giao tới sảnh. Cần 1-2 bạn nam hỗ trợ bê lên tầng 5.',
            location: 'Block A - 20m',
            time: '15 phút trước'
        },
        {
            id: 6,
            type: 'offer',
            user: 'Thanh Vân',
            avatar: 'https://i.pravatar.cc/150?u=van',
            title: 'Tặng rau sạch Đà Lạt',
            desc: 'Người nhà gửi lên nhiều quá ăn không hết, mình tặng bớt cho hàng xóm. Rau rất tươi và sạch.',
            location: 'Block D - 150m',
            time: '3 giờ trước'
        }
    ];

    const mapPins = [
        { top: '30%', left: '40%', type: 'need', title: 'Máy khoan', user: 'Minh Hoàng' },
        { top: '55%', left: '60%', type: 'offer', title: 'Sửa điện', user: 'Bác Hùng' },
        { top: '20%', left: '75%', type: 'need', title: 'Trông cún', user: 'Linh Chi' },
        { top: '70%', left: '30%', type: 'offer', title: 'Đồ nghề sửa xe', user: 'Tuấn Anh' },
        { top: '45%', left: '20%', type: 'need', title: 'Bê tủ lạnh', user: 'Chị Lan' }
    ];

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = false;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            if (isDark) {
                body.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // --- Render Cards ---
    const cardsContainer = document.getElementById('cards-container');
    
    function renderCards(filter = 'all') {
        if (!cardsContainer) return;
        cardsContainer.innerHTML = '';
        const filteredData = filter === 'all' ? helpData : helpData.filter(item => item.type === filter);
        
        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = `help-card glass-card reveal`;
            card.innerHTML = `
                <div class="card-header">
                    <div class="user-info">
                        <img src="${item.avatar}" alt="${item.user}">
                        <div class="user-meta">
                            <h4>${item.user}</h4>
                            <span>${item.time}</span>
                        </div>
                    </div>
                    <span class="card-tag tag-${item.type}">${item.type === 'need' ? 'Cần giúp' : 'Có thể giúp'}</span>
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
                <div class="card-footer">
                    <div class="location-info">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${item.location}</span>
                    </div>
                    <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Liên hệ</button>
                </div>
            `;
            cardsContainer.appendChild(card);
            
            // Re-trigger reveal for new elements
            setTimeout(() => card.classList.add('active'), 50);
        });
    }

    renderCards();

    // --- Filter Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards(btn.getAttribute('data-filter'));
        });
    });

    // --- Render Map Pins ---
    const mapPinsContainer = document.getElementById('map-pins-container');
    if (mapPinsContainer) {
        mapPins.forEach(pin => {
            const pinEl = document.createElement('div');
            pinEl.className = `map-pin pin-${pin.type}`;
            pinEl.style.top = pin.top;
            pinEl.style.left = pin.left;
            pinEl.innerHTML = `
                <i class="fa-solid fa-location-dot"></i>
                <div class="map-popup">
                    <h4>${pin.title}</h4>
                    <p>Bởi: ${pin.user}</p>
                    <a href="#" class="popup-btn">Xem chi tiết</a>
                </div>
            `;
            mapPinsContainer.appendChild(pinEl);
        });
    }

    // --- Testimonials Carousel ---
    const tDots = document.querySelectorAll('.t-dot');
    const tCards = document.querySelectorAll('.testimonial-card');
    
    tDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = dot.getAttribute('data-index');
            
            tDots.forEach(d => d.classList.remove('active'));
            tCards.forEach(c => c.classList.remove('active'));
            
            dot.classList.add('active');
            document.getElementById(`testimonial-${index}`).classList.add('active');
        });
    });

    // --- Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // --- Statistics Counter ---
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const suffix = entry.target.getAttribute('data-suffix') || '';
                let count = 0;

                const updateCount = () => {
                    const increment = Math.ceil(target / 100);
                    if (count < target) {
                        count += increment;
                        if (count > target) count = target;
                        entry.target.innerText = count + (target > 100 ? '+' : '') + suffix;
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target + (target > 100 ? '+' : '') + suffix;
                    }
                };
                updateCount();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));
});
