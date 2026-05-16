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

    // --- Sample Data & Persistence ---
    const defaultHelpData = [
        {
            id: 1,
            type: 'need',
            category: 'tools',
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
            category: 'skills',
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
            category: 'pets',
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
            category: 'tools',
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
            category: 'other',
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
            category: 'other',
            user: 'Thanh Vân',
            avatar: 'https://i.pravatar.cc/150?u=van',
            title: 'Tặng rau sạch Đà Lạt',
            desc: 'Người nhà gửi lên nhiều quá ăn không hết, mình tặng bớt cho hàng xóm. Rau rất tươi và sạch.',
            location: 'Block D - 150m',
            time: '3 giờ trước'
        }
    ];

    let helpData = JSON.parse(localStorage.getItem('localhelp_posts')) || defaultHelpData;

    function saveToStorage() {
        localStorage.setItem('localhelp_posts', JSON.stringify(helpData));
    }

    const activitiesData = [
        {
            id: 1,
            tag: 'Sẻ chia',
            title: 'Tặng rau sạch Block D',
            desc: 'Chị Vân đã chia sẻ hơn 5kg rau sạch cho các hộ gia đình khó khăn trong tòa nhà.',
            img: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 2,
            tag: 'Kỹ thuật',
            title: 'Sửa điện tầng 12',
            desc: 'Bác Hùng giúp gia đình chị Lan khắc phục sự cố chập điện trong đêm mưa.',
            img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 3,
            tag: 'Thú cưng',
            title: 'Gửi gắm yêu thương',
            desc: 'Bé Poodle nhà Linh Chi đã có một buổi chiều vui vẻ cùng các bạn nhỏ tại công viên.',
            img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600'
        }
    ];

    const mapPins = [
        { top: '30%', left: '40%', type: 'need', title: 'Máy khoan', user: 'Minh Hoàng' },
        { top: '55%', left: '60%', type: 'offer', title: 'Sửa điện', user: 'Bác Hùng' },
        { top: '20%', left: '75%', type: 'need', title: 'Trông cún', user: 'Linh Chi' },
        { top: '70%', left: '30%', type: 'offer', title: 'Đồ nghề sửa xe', user: 'Tuấn Anh' },
        { top: '45%', left: '20%', type: 'need', title: 'Bê tủ lạnh', user: 'Chị Lan' }
    ];

    // --- Hero Buttons Logic ---
    const heroNeedBtn = document.getElementById('hero-need-btn');
    const heroOfferBtn = document.getElementById('hero-offer-btn');

    function handleHeroAction(type) {
        const marketplaceSection = document.getElementById('marketplace');
        const btnFilterAll = document.getElementById('btn-filter-all');
        const toggleBtn = document.querySelector(`.toggle-btn[data-filter="${type}"]`);
        
        if (marketplaceSection) {
            marketplaceSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                // Set filter UI
                if (btnFilterAll) btnFilterAll.classList.remove('active');
                if (toggleBtn) toggleBtn.click();
                
                openModal();
                const typeSelect = document.getElementById('post-type');
                if (typeSelect) {
                    typeSelect.value = type;
                }
            }, 800);
        }
    }

    if (heroNeedBtn) heroNeedBtn.addEventListener('click', () => handleHeroAction('need'));
    if (heroOfferBtn) heroOfferBtn.addEventListener('click', () => handleHeroAction('offer'));

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
    let currentFilter = 'all';
    let currentCategory = 'all';
    let searchQuery = '';
    
    function renderCards() {
        if (!cardsContainer) return;
        cardsContainer.innerHTML = '';
        
        const filteredData = helpData.filter(item => {
            const matchesType = currentFilter === 'all' || item.type === currentFilter;
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 item.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesCategory && matchesSearch;
        });
        
        if (filteredData.length === 0) {
            cardsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Không tìm thấy kết quả phù hợp.</div>';
            return;
        }

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
                    <div class="card-actions">
                        <button class="action-btn btn-edit" data-id="${item.id}" title="Sửa bài"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn btn-delete" data-id="${item.id}" title="Xóa bài"><i class="fa-solid fa-trash"></i></button>
                        <button class="switch-type-btn action-btn" data-id="${item.id}" title="Chuyển đổi Cần/Có thể"><i class="fa-solid fa-rotate"></i></button>
                        <span class="card-tag tag-${item.type}">${item.type === 'need' ? 'Cần giúp' : 'Có thể giúp'}</span>
                    </div>
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

        // Add event listeners for actions
        document.querySelectorAll('.switch-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.getAttribute('data-id'));
                const item = helpData.find(i => i.id === id);
                if (item) {
                    item.type = item.type === 'need' ? 'offer' : 'need';
                    saveToStorage();
                    renderCards();
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
                    const id = parseInt(btn.getAttribute('data-id'));
                    helpData = helpData.filter(item => item.id !== id);
                    saveToStorage();
                    renderCards();
                }
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.getAttribute('data-id'));
                const item = helpData.find(i => i.id === id);
                if (item) openModal(item);
            });
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('post-modal');
    const postForm = document.getElementById('post-form');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtns = [
        document.getElementById('close-modal-btn'),
        document.getElementById('cancel-modal-btn')
    ];

    function openModal(editItem = null) {
        if (!modal) return;
        modal.classList.add('active');
        
        if (editItem) {
            document.getElementById('modal-title').innerText = 'Chỉnh sửa bài đăng';
            document.getElementById('post-id').value = editItem.id;
            document.getElementById('post-type').value = editItem.type;
            document.getElementById('post-category').value = editItem.category;
            document.getElementById('post-title').value = editItem.title;
            document.getElementById('post-desc').value = editItem.desc;
            document.getElementById('post-location').value = editItem.location;
        } else {
            document.getElementById('modal-title').innerText = 'Tạo bài đăng mới';
            postForm.reset();
            document.getElementById('post-id').value = '';
        }
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    if (openModalBtn) openModalBtn.addEventListener('click', () => openModal());
    closeModalBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', closeModal);
    });

    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = document.getElementById('post-id').value;
            const postData = {
                id: id ? parseInt(id) : Date.now(),
                type: document.getElementById('post-type').value,
                category: document.getElementById('post-category').value,
                title: document.getElementById('post-title').value,
                desc: document.getElementById('post-desc').value,
                location: document.getElementById('post-location').value,
                user: id ? helpData.find(i => i.id === parseInt(id)).user : 'Bạn (Hàng xóm)',
                avatar: id ? helpData.find(i => i.id === parseInt(id)).avatar : 'https://i.pravatar.cc/150?u=you',
                time: id ? helpData.find(i => i.id === parseInt(id)).time : 'Vừa xong'
            };

            if (id) {
                // Update
                const index = helpData.findIndex(i => i.id === parseInt(id));
                helpData[index] = postData;
            } else {
                // Create
                helpData.unshift(postData);
            }

            saveToStorage();
            renderCards();
            closeModal();
        });
    }

    renderCards();

    // --- Search Logic ---
    const searchInput = document.getElementById('market-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCards();
        });
    }

    // --- Filter Logic ---
    const btnFilterAll = document.getElementById('btn-filter-all');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const typeToggle = document.getElementById('type-toggle');
    
    if (btnFilterAll) {
        btnFilterAll.addEventListener('click', () => {
            btnFilterAll.classList.add('active');
            toggleBtns.forEach(b => b.classList.remove('active'));
            if (typeToggle) typeToggle.setAttribute('data-active', 'none');
            currentFilter = 'all';
            renderCards();
        });
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btnFilterAll) btnFilterAll.classList.remove('active');
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            if (typeToggle) typeToggle.setAttribute('data-active', currentFilter);
            renderCards();
        });
    });

    const categoryChips = document.querySelectorAll('.category-chip');
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentCategory = chip.getAttribute('data-category');
            renderCards();
        });
    });

    // --- Render Activities ---
    const activitiesContainer = document.getElementById('activities-container');
    if (activitiesContainer) {
        activitiesData.forEach(act => {
            const actCard = document.createElement('div');
            actCard.className = 'activity-card reveal';
            actCard.innerHTML = `
                <img src="${act.img}" alt="${act.title}" class="activity-img">
                <div class="activity-overlay">
                    <span class="activity-tag">${act.tag}</span>
                    <h3>${act.title}</h3>
                    <p>${act.desc}</p>
                </div>
            `;
            activitiesContainer.appendChild(actCard);
        });
    }

    // --- Switch to Help Logic ---
    const switchToHelpBtn = document.getElementById('switch-to-help');
    if (switchToHelpBtn) {
        switchToHelpBtn.addEventListener('click', () => {
            const marketplaceSection = document.getElementById('marketplace');
            const filterNeedBtn = document.querySelector('.toggle-btn[data-filter="need"]');
            
            if (marketplaceSection) {
                marketplaceSection.scrollIntoView({ behavior: 'smooth' });
                
                setTimeout(() => {
                    if (filterNeedBtn) {
                        filterNeedBtn.click();
                    }
                }, 600);
            }
        });
    }

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
