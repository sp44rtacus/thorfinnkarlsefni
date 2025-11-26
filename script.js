// Анимации при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами, которые должны появляться при скролле
    const elementsToAnimate = document.querySelectorAll('.feature-card, .timeline-item, .gallery-item, .contact-item, .interactive-card, .skill-category, .timeline-card, .fanart-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Добавляем или убираем класс для body чтобы запретить прокрутку
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие меню при клике на ссылку - только для мобильной версии
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', function() {
        // Закрываем меню только если оно активно (мобильная версия)
        if (window.innerWidth <= 768 && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }
    }));

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            hamburger.classList.contains('active') && 
            !navContainer.contains(event.target) && 
            !event.target.classList.contains('hamburger')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Кнопка "Исследовать сагу" на главной странице
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            window.location.href = 'about.html';
        });
    }

    // Фильтрация галереи
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс на нажатую кнопку
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Обработка формы обратной связи с Web3Forms
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const submitText = this.querySelector('.submit-text');
            const spinner = this.querySelector('.loading-spinner');
            
            // Показываем индикатор загрузки
            submitText.textContent = 'Отправка...';
            spinner.style.display = 'block';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                
                // Добавляем дополнительные поля для Web3Forms
                formData.append('redirect', 'false');
                
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✅ Сообщение отправлено! Спасибо за ваше сообщение. Мы ответим вам в ближайшее время.');
                    this.reset();
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Web3Forms Error:', error);
                alert('❌ Ошибка отправки. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.');
            } finally {
                // Восстанавливаем кнопку
                submitText.textContent = 'Отправить сообщение';
                spinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    // Анимация изображения героя при загрузке
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        heroImg.style.opacity = '0';
        heroImg.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            heroImg.style.transition = 'opacity 1s, transform 1s';
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'translateX(0)';
        }, 500);
    }
    
    // Новые инициализации
    initializeQuoteGenerator();
    initializeEvolutionSlider();
    initializeComparisonTabs();
    initializePhilosophyTimeline();
    initializeSeasonalDesign();
    initializeAchievements();
    initializeSkillsChart();
    initializeTimeline();
    initializeFanartGallery();
    initializeBackgroundSlider();
    initializeLogoModal();
});

// Слайдер фоновых изображений на главной
function initializeBackgroundSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Запускаем автоматическую смену слайдов каждые 5 секунд
    setInterval(nextSlide, 5000);
}

// Модальное окно для логотипа - ИСПРАВЛЕННАЯ ВЕРСИЯ
function initializeLogoModal() {
    const logoBtn = document.getElementById('logo-btn');
    const logoModal = document.getElementById('logo-modal');
    
    if (logoBtn && logoModal) {
        // Обработчик для открытия модального окна
        logoBtn.addEventListener('click', function() {
            logoModal.style.display = 'block';
        });
        
        // Обработчики для закрытия модального окна
        const closeButtons = logoModal.querySelectorAll('.close-modal, .modal-btn');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                logoModal.style.display = 'none';
            });
        });
        
        // Закрытие при клике вне модального окна
        window.addEventListener('click', function(e) {
            if (e.target === logoModal) {
                logoModal.style.display = 'none';
            }
        });
        
        // Закрытие при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && logoModal.style.display === 'block') {
                logoModal.style.display = 'none';
            }
        });
    }
}

// Генератор случайных цитат
function initializeQuoteGenerator() {
    const quotes = [
        { text: "Настоящий воин не нуждается в мече.", context: "— Торфинн Карлсефни" },
        { text: "У настоящего воина нет врагов.", context: "— Торс, отец Торфинна" },
        { text: "Я не буду больше сражаться. Я буду жить по-настоящему.", context: "— Торфинн Карлсефни" },
        { text: "Мы создадим страну, где не будет рабства.", context: "— Торфинн Карлсефни" },
        { text: "Месть не принесет ничего, кроме пустоты.", context: "— Торфинн Карлсефни" },
        { text: "Сила нужна для защиты, а не для нападения.", context: "— Торфинн Карлсефни" },
        { text: "Винланд — это место, где мы можем начать все заново.", context: "— Торфинн Карлсефни" },
        { text: "Я не хочу быть орудием убийства. Я хочу быть человеком.", context: "— Торфинн Карлсефни" },
        { text: "Истинная храбрость — в умении прощать.", context: "— Торфинн Карлсефни" },
        { text: "Будущее строится на взаимопонимании, а не на завоевании.", context: "— Торфинн Карлсефни" },
        { text: "Каждый человек заслуживает шанса на мирную жизнь.", context: "— Торфинн Карлсефни" },
        { text: "Насилие порождает только новое насилие.", context: "— Торфинн Карлсефни" },
        { text: "Мир — это не отсутствие конфликтов, а умение их разрешать.", context: "— Торфинн Карлсефни" },
        { text: "Истинная сила — в умении контролировать себя.", context: "— Торфинн Карлсефни" },
        { text: "Мы все ищем свой Винланд — место, где можем быть свободными.", context: "— Торфинн Карлсефни" }
    ];

    const generateBtn = document.getElementById('generate-quote');
    const quoteElement = document.getElementById('random-quote');
    const contextElement = document.getElementById('quote-context');
    const copyBtn = document.getElementById('copy-quote');
    const shareBtn = document.getElementById('share-quote');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteElement.textContent = quotes[randomIndex].text;
            contextElement.textContent = quotes[randomIndex].context;
            
            // Анимация
            quoteElement.style.animation = 'none';
            setTimeout(() => {
                quoteElement.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = `${quoteElement.textContent} ${contextElement.textContent}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Показать уведомление о копировании
                alert('Цитата скопирована в буфер обмена!');
            });
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const textToShare = `${quoteElement.textContent} ${contextElement.textContent}`;
            if (navigator.share) {
                navigator.share({
                    title: 'Цитата Торфинна',
                    text: textToShare,
                    url: window.location.href
                });
            } else {
                // Fallback для браузеров без поддержки Web Share API
                alert('Поделиться: ' + textToShare);
            }
        });
    }
}

// Шкала эволюции
function initializeEvolutionSlider() {
    const stages = document.querySelectorAll('.evolution-stage');
    const prevBtn = document.getElementById('prev-stage');
    const nextBtn = document.getElementById('next-stage');
    const evolutionImg = document.getElementById('evolution-img');
    
    let currentStage = 0;

    const stageImages = [
        'img_evolution_1.png', // Детство
        'img_evolution_2.png', // Воин
        'img_evolution_3.png', // Раб
        'img_evolution_4.png'  // Пионер
    ];

    function updateStage(direction) {
        stages[currentStage].classList.remove('active');
        
        if (direction === 'next' && currentStage < stages.length - 1) {
            currentStage++;
        } else if (direction === 'prev' && currentStage > 0) {
            currentStage--;
        }
        
        stages[currentStage].classList.add('active');
        
        // Обновляем изображение
        if (evolutionImg) {
            evolutionImg.src = stageImages[currentStage];
            evolutionImg.alt = stages[currentStage].querySelector('h3').textContent;
        }

        // Обновляем состояние кнопок
        prevBtn.disabled = currentStage === 0;
        nextBtn.disabled = currentStage === stages.length - 1;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => updateStage('prev'));
        nextBtn.addEventListener('click', () => updateStage('next'));
    }

    // Клик по маркерам этапов
    stages.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            stages[currentStage].classList.remove('active');
            currentStage = index;
            stages[currentStage].classList.add('active');
            
            if (evolutionImg) {
                evolutionImg.src = stageImages[currentStage];
                evolutionImg.alt = stage.querySelector('h3').textContent;
            }
        });
    });
}

// Сравнение вымышленного и исторического Торфинна
function initializeComparisonTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Убираем активный класс со всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс нажатой кнопке и соответствующему контенту
            btn.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
}

// Философия - переключение этапов
function initializePhilosophyTimeline() {
    const philosophyPoints = document.querySelectorAll('.philosophy-point');
    const philosophyImg = document.getElementById('philosophy-img');
    const philosophyQuote = document.getElementById('philosophy-quote-text');
    const philosophyContext = document.getElementById('philosophy-context');

    const philosophyData = {
        revenge: {
            image: 'img_philosophy_1.png',
            quote: '"Я убью тебя, Аскеладд!"',
            context: '— Торфинн в юности'
        },
        doubt: {
            image: 'img_philosophy_2.png',
            quote: '"Зачем я продолжаю сражаться?"',
            context: '— Торфинн в отряде Аскеладда'
        },
        awakening: {
            image: 'img_philosophy_3.png',
            quote: '"У настоящего воина нет врагов"',
            context: '— Торфинн вспоминает слова отца'
        },
        peace: {
            image: 'img_philosophy_4.png',
            quote: '"Мы создадим страну без рабства"',
            context: '— Торфинн в Винланде'
        }
    };

    philosophyPoints.forEach(point => {
        point.addEventListener('click', function() {
            const stage = this.dataset.stage;
            
            // Убираем активный класс со всех точек
            philosophyPoints.forEach(p => p.classList.remove('active'));
            
            // Добавляем активный класс текущей точке
            this.classList.add('active');
            
            // Обновляем изображение и цитату
            if (philosophyImg && philosophyQuote && philosophyContext) {
                philosophyImg.src = philosophyData[stage].image;
                philosophyQuote.textContent = philosophyData[stage].quote;
                philosophyContext.textContent = philosophyData[stage].context;
                
                // Анимация
                philosophyImg.style.animation = 'none';
                setTimeout(() => {
                    philosophyImg.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
        });
    });
}

// Сезонный дизайн
function initializeSeasonalDesign() {
    const body = document.body;
    const now = new Date();
    const month = now.getMonth() + 1;
    
    // Убираем предыдущие сезонные классы
    body.classList.remove('winter-theme', 'spring-theme', 'summer-theme', 'autumn-theme');
    
    // Добавляем соответствующий сезону класс
    if (month >= 12 || month <= 2) {
        // Зима
        body.classList.add('winter-theme');
    } else if (month >= 3 && month <= 5) {
        // Весна
        body.classList.add('spring-theme');
    } else if (month >= 6 && month <= 8) {
        // Лето
        body.classList.add('summer-theme');
    } else {
        // Осень
        body.classList.add('autumn-theme');
    }
}

// Система достижений
function initializeAchievements() {
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '{}');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Отмечаем текущую страницу как посещенную
    visitedPages[currentPage] = true;
    localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    
    // Проверяем достижения
    checkAchievements(visitedPages);
}

function checkAchievements(visitedPages) {
    const achievements = JSON.parse(localStorage.getItem('achievements') || '{}');
    
    // Достижение "Исследователь" - посетить 5 разных страниц
    const pageCount = Object.keys(visitedPages).length;
    if (pageCount >= 5 && !achievements.explorer) {
        achievements.explorer = true;
        showAchievement('Исследователь', 'Посетили 5 разных страниц сайта!');
    }
    
    // Достижение "Знаток" - посетить все основные страницы
    const requiredPages = ['index.html', 'about.html', 'timeline.html', 'gallery.html', 'philosophy.html'];
    const hasAllPages = requiredPages.every(page => visitedPages[page]);
    if (hasAllPages && !achievements.expert) {
        achievements.expert = true;
        showAchievement('Знаток Саги', 'Изучили все основные разделы сайта!');
    }
    
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function showAchievement(title, description) {
    // Создаем уведомление о достижении
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-content">
            <h4>Достижение разблокировано!</h4>
            <h5>${title}</h5>
            <p>${description}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Убираем уведомление через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Диаграмма навыков
function initializeSkillsChart() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        const value = skill.getAttribute('data-value');
        const fill = skill.querySelector('.skill-fill');
        
        // Анимируем заполнение полосы
        setTimeout(() => {
            fill.style.width = `${value}%`;
        }, 300);
    });
}

// Инициализация временной шкалы
function initializeTimeline() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    if (timelineCards.length === 0) return;
    
    // Обработчик клика для переворота карточек
    timelineCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Intersection Observer для активации карточек
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Можно раскомментировать, если хотите, чтобы карточки снова становились неактивными при скролле вверх
                // entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    timelineCards.forEach(card => {
        observer.observe(card);
    });
}

// Инициализация галереи фан-артов с Web3Forms
function initializeFanartGallery() {
    const fanartForm = document.getElementById('fanart-form');
    const successModal = document.getElementById('success-modal');
    
    if (!fanartForm) return;
    
    // Обработка отправки формы фан-арта
    fanartForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.fanart-submit');
        const submitText = this.querySelector('.submit-text');
        const spinner = this.querySelector('.loading-spinner');
        
        // Показываем индикатор загрузки
        submitText.textContent = 'Отправка...';
        spinner.style.display = 'block';
        submitBtn.disabled = true;
        
        try {
            // Создаем FormData из формы
            const formData = new FormData(this);
            
            // Добавляем дополнительные поля для Web3Forms
            formData.append('redirect', 'false');
            
            // Отправляем запрос
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Сбрасываем форму
                fanartForm.reset();
                
                // Показываем модальное окно успеха
                showSuccessModal();
            } else {
                throw new Error(result.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            console.error('Web3Forms Error:', error);
            alert('❌ Ошибка отправки фан-арта. Пожалуйста, попробуйте еще раз. Ошибка: ' + error.message);
        } finally {
            // Восстанавливаем кнопку
            submitText.textContent = 'Отправить на модерацию';
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
    
    // Функция показа модального окна успеха
    function showSuccessModal() {
        if (successModal) {
            successModal.style.display = 'block';
            
            // Обработчики для закрытия модального окна успеха
            const closeButtons = successModal.querySelectorAll('.close-modal, .modal-btn');
            
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    successModal.style.display = 'none';
                });
            });
            
            // Закрытие при клике вне модального окна
            window.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    successModal.style.display = 'none';
                }
            });
            
            // Закрытие при нажатии Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && successModal.style.display === 'block') {
                    successModal.style.display = 'none';
                }
            });
        }
    }
}