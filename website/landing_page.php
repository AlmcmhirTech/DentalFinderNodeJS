<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meeco - Study Smart</title>
    <link rel="stylesheet" href="css/landing-page-style.css ?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/navbar-style.css ?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/footer-style.css ?v=<?php echo time(); ?>">
</head>

<body>
    <nav class="navbar">
        <div class="container">

            <div class="logo">
                <a href="landing_page.php" style="text-decoration: none;"><img src="imgs/dental-logo.jpg" alt="DentaFinder Logo"></a>
            </div>

            <a href="../login_register/login.php">
                <button class="login-btn">Log In</button>
            </a>
        </div>
    </nav>

    <main>
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-left">
                        <img src="imgs/mascot-1.png" alt="Meeco Mascot" class="mascot-img">
                    </div>
                    <div class="hero-right">
                        <h1>Elevate your study game, effortlessly</h1>
                        <div class="cta-buttons">
                            <button class="btn-primary">Get Started</button>
                            <a href="../login_register/login.php" class="account-link">I ALREADY HAVE AN ACCOUNT</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="how-it-works">
            <div class="container">
                <h2 class="text-how-it-works"><img src="pictures/sparkling.png" alt="sparkle" class="sparkle"></span>How it <span class="highlight-blue">works?</span><img src="pictures/sparkling.png" alt="sparkle" class="sparkle"></span></h2>
                <p class="section-desc" style="margin-bottom: 32px;">"Effortlessly connect with top dental clinics to book and manage your appointments in just a few clicks. For clinic owners, streamline operations and efficiently oversee your dental practice with ease."</p>
                <div class="features-grid">
                    <a href="convert-image.php" style="text-decoration: none;"><button class="feature-btn">Book Now</button></a>
                    <a href="quiz-maker.php" style="text-decoration: none;"><button class="feature-btn">Manage Now</button></a>
                    <a href="summarizer-and-reviewer.php" style="text-decoration: none;"><button class="feature-btn">Browse Dental Clinics</button></a>
                </div>
            </div>
        </section>

        <section class="quick-efficient">
            <div class="container">
                <div class="content-split">
                    <div class="image-content">
                        <img src="imgs/mascot-2.png" alt="level-up" class="up-meeco">
                    </div>
                    <div class="text-content">
                        <h2>Quick. Convenient. Efficient.</h2>
                        <p style="margin-bottom: 32px;">
                            Effortlessly connect with top dental clinics to book appointments or manage your clinic instantly. Save time and enhance productivity with just a few clicks!</p>
                        <a href="convert-image.php" style="text-decoration: none;">
                            <button class="btn-secondary">Learn more</button>
                        </a>
                    </div>

                </div>
            </div>
        </section>

        <section class="info-digest">
            <div class="container">
                <div class="content-split">
                    <div class="image-content">
                        <img src="imgs/mascot-3.png" alt="Info Digest Mascot" class="present-png">
                    </div>
                    <div class="text-content">
                        <h2>Smart Dental Overview</h2>
                        <p style="margin-bottom: 32px;">Skip the hassle of traditional booking methods. Easily gather and summarize all your dental appointment details, giving you a clear and concise overview for stress-free scheduling..</p>
                        <a href="summarizer-and-reviewer.php" style="text-decoration: none;">
                            <button class="btn-secondary">Learn more</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>



        </section>
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-section">
                        <h3>About us</h3>
                        <ul>
                            <li><a href="#">Mission</a></li>
                            <li><a href="#">Vision</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Privacy and Terms</h3>
                        <ul>
                            <li><a href="#">Community guidelines</a></li>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Help and Support</h3>
                        <ul>
                            <li><a href="faq.php">FAQ</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </main>
</body>

</html>