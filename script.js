// Romantic Web Site Animation Script
class RomanticAnimations {
    constructor() {
        this.canvas = document.getElementById('romantic-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.heartParticles = [];
        this.sparkles = [];
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createHearts();
        this.createButterflies();
        this.createPetals();
        this.createStars();
        this.setupAudio();
        this.startAnimations();
        this.createCanvasEffects();
        
        // Pencere boyutu değiştiğinde canvas'ı güncelle
        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupAudio() {
        const audio = document.getElementById('background-music');
        
        // Kullanıcı etkileşimi sonrası müziği başlat
        const playMusic = () => {
            audio.play().catch(e => {
                console.log('Müzik otomatik başlatılamadı:', e);
            });
            document.removeEventListener('click', playMusic);
            document.removeEventListener('keydown', playMusic);
            document.removeEventListener('touchstart', playMusic);
        };
        
        document.addEventListener('click', playMusic);
        document.addEventListener('keydown', playMusic);
        document.addEventListener('touchstart', playMusic);
    }

    createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💞', '💘', '🌹'];
        
        setInterval(() => {
            if (heartsContainer.children.length < 15) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heart.style.animationDuration = (4 + Math.random() * 4) + 's';
                
                heartsContainer.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 8000);
            }
        }, 800);
    }

    createButterflies() {
        const butterfliesContainer = document.querySelector('.butterflies-container');
        const butterflySymbols = ['🦋', '🌸', '🌺', '🌼'];
        
        setInterval(() => {
            if (butterfliesContainer.children.length < 5) {
                const butterfly = document.createElement('div');
                butterfly.className = 'butterfly';
                butterfly.textContent = butterflySymbols[Math.floor(Math.random() * butterflySymbols.length)];
                butterfly.style.top = Math.random() * 80 + 10 + 'vh';
                butterfly.style.animationDelay = Math.random() * 3 + 's';
                butterfly.style.animationDuration = (8 + Math.random() * 8) + 's';
                
                butterfliesContainer.appendChild(butterfly);
                
                setTimeout(() => {
                    if (butterfly.parentNode) {
                        butterfly.parentNode.removeChild(butterfly);
                    }
                }, 16000);
            }
        }, 3000);
    }

    createPetals() {
        const petalsContainer = document.querySelector('.petals-container');
        
        setInterval(() => {
            if (petalsContainer.children.length < 20) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDelay = Math.random() * 2 + 's';
                petal.style.animationDuration = (6 + Math.random() * 4) + 's';
                
                // Rastgele petal renkleri
                const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF91A4'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                petal.style.background = `radial-gradient(circle, ${color}, #FF1493)`;
                
                petalsContainer.appendChild(petal);
                
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 10000);
            }
        }, 500);
    }

    createStars() {
        const starsContainer = document.querySelector('.stars-container');
        
        // Sabit yıldızlar oluştur
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = '✨';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animationDuration = (1 + Math.random() * 2) + 's';
            
            starsContainer.appendChild(star);
        }
    }

    startAnimations() {
        // GSAP ana başlık animasyonu
        gsap.from("#shahzoda-text", {
            duration: 3,
            y: -100,
            opacity: 0,
            scale: 0.5,
            ease: "elastic.out(1, 0.3)",
            delay: 1
        });

        gsap.from(".subtitle", {
            duration: 2,
            y: 50,
            opacity: 0,
            ease: "back.out(1.7)",
            delay: 2.5
        });

        // Anime.js ile harf animasyonları
        anime({
            targets: '.letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 600,
            delay: (el, i) => 3000 + (i * 100)
        });

        // Sürekli parlama efekti
        setInterval(() => {
            gsap.to("#shahzoda-text", {
                duration: 0.1,
                textShadow: "0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,105,180,0.9), 0 0 90px rgba(255,20,147,0.8)",
                yoyo: true,
                repeat: 1
            });
        }, 3000);
    }

    createCanvasEffects() {
        // Parçacık sistemi
        this.createParticles();
        this.animate();
    }

    createParticles() {
        // Işıltı parçacıkları
        for (let i = 0; i < 50; i++) {
            this.sparkles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: Math.random(),
                life: Math.random() * 100 + 50
            });
        }

        // Kalp parçacıkları
        for (let i = 0; i < 20; i++) {
            this.heartParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 15 + 10,
                speedY: -(Math.random() * 2 + 1),
                opacity: Math.random() * 0.5 + 0.3,
                life: Math.random() * 200 + 100,
                angle: Math.random() * Math.PI * 2
            });
        }
    }

    drawHeart(x, y, size) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(size / 20, size / 20);
        
        this.ctx.fillStyle = `rgba(255, 105, 180, ${Math.random() * 0.5 + 0.3})`;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 3);
        this.ctx.bezierCurveTo(-8, -5, -15, 1, 0, 15);
        this.ctx.bezierCurveTo(15, 1, 8, -5, 0, 3);
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawSparkle(x, y, size, opacity) {
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = '#FFFFFF';
        
        // Yıldız şekli
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            this.ctx.rotate(Math.PI / 2);
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, size);
        }
        this.ctx.stroke();
        
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Işıltı parçacıklarını çiz ve güncelle
        this.sparkles.forEach((sparkle, index) => {
            this.drawSparkle(sparkle.x, sparkle.y, sparkle.size, sparkle.opacity);
            
            sparkle.x += sparkle.speedX;
            sparkle.y += sparkle.speedY;
            sparkle.life--;
            sparkle.opacity = Math.sin(sparkle.life * 0.1) * 0.5 + 0.5;
            
            if (sparkle.life <= 0 || sparkle.x < 0 || sparkle.x > this.canvas.width || 
                sparkle.y < 0 || sparkle.y > this.canvas.height) {
                this.sparkles[index] = {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    opacity: Math.random(),
                    life: Math.random() * 100 + 50
                };
            }
        });

        // Kalp parçacıklarını çiz ve güncelle
        this.heartParticles.forEach((heart, index) => {
            this.drawHeart(heart.x, heart.y, heart.size);
            
            heart.y += heart.speedY;
            heart.angle += 0.02;
            heart.x += Math.sin(heart.angle) * 0.5;
            heart.life--;
            
            if (heart.life <= 0 || heart.y < -50) {
                this.heartParticles[index] = {
                    x: Math.random() * this.canvas.width,
                    y: this.canvas.height + 50,
                    size: Math.random() * 15 + 10,
                    speedY: -(Math.random() * 2 + 1),
                    opacity: Math.random() * 0.5 + 0.3,
                    life: Math.random() * 200 + 100,
                    angle: Math.random() * Math.PI * 2
                };
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Romantic Website Loading... 💕');
    
    setTimeout(() => {
        new RomanticAnimations();
    }, 500);
});

// Ekstra romantik efektler
document.addEventListener('click', (e) => {
    createClickEffect(e.clientX, e.clientY);
});

function createClickEffect(x, y) {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = `clickHeart 2s ease-out forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
}

// Click efekti CSS animasyonu
const style = document.createElement('style');
style.textContent = `
    @keyframes clickHeart {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg) translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);