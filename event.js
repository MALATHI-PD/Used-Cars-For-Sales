// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // In a real app, you would validate credentials with a server
                // For demo purposes, we'll just redirect to the cars page
                window.location.href = 'cars.html';
                
                // Store login state in localStorage
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('Please enter both username and password');
            }
        });
    }
    
    // Check if user is logged in when accessing other pages
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'index.html';
        }
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logoutBtn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    });
    
    // Car Listing Page Functionality
    if (document.getElementById('carGrid')) {
        // Sample car data
        const cars = [
            {
                id: 1,
                make: 'Honda',
                model: 'Civic',
                year: 2018,
                price: 18500,
                mileage: '45,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                image: 'hondacivic.jpg',
                description: 'This well-maintained 2018 Honda Civic LX comes with a clean title and has been regularly serviced.'
            },
            {
                id: 2,
                make: 'Toyota',
                model: 'Camry',
                year: 2019,
                price: 21500,
                mileage: '32,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                image: 'toyota.jpg',
                description: '2019 Toyota Camry SE with great features and excellent condition.'
            },
            {
                id: 3,
                make: 'Ford',
                model: 'F-150',
                year: 2017,
                price: 28500,
                mileage: '68,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                image: 'ford.jpg',
                description: 'Powerful Ford F-150 XLT with towing package and crew cab.'
            },
            {
                id: 4,
                make: 'Chevrolet',
                model: 'Malibu',
                year: 2020,
                price: 19500,
                mileage: '28,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                image: 'chevrolet.jpg',
                description: '2020 Chevrolet Malibu LT with premium sound system and leather seats.'
            },
            {
                id: 5,
                make: 'BMW',
                model: '3 Series',
                year: 2016,
                price: 24500,
                mileage: '52,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                image: 'bmw.jpg',
                description: 'Luxury BMW 3 Series with navigation and premium package.'
            },
            {
                id: 6,
                make: 'Hyundai',
                model: 'Tucson',
                year: 2021,
                price: 22500,
                mileage: '18,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                image: 'hyundai.jpg',
                description: 'Like-new 2021 Hyundai Tucson with all the latest features.'
            }
        ];
        
        const carGrid = document.getElementById('carGrid');
        
        // Display cars
        function displayCars(carsToDisplay) {
            carGrid.innerHTML = '';
            
            carsToDisplay.forEach(car => {
                const carCard = document.createElement('div');
                carCard.className = 'car-card';
                carCard.innerHTML = `
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.make} ${car.model}">
                    </div>
                    <div class="car-info">
                        <h3>${car.year} ${car.make} ${car.model}</h3>
                        <p class="car-price">$${car.price.toLocaleString()}</p>
                        <div class="car-specs">
                            <span class="car-spec">${car.mileage}</span>
                            <span class="car-spec">${car.transmission}</span>
                            <span class="car-spec">${car.fuel}</span>
                        </div>
                        <a href="car-details.html?id=${car.id}" class="view-details-btn">View Details</a>
                    </div>
                `;
                
                carGrid.appendChild(carCard);
            });
        }
        
        // Initial display
        displayCars(cars);
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const priceFilter = document.getElementById('priceFilter');
        
        function filterCars() {
            const searchTerm = searchInput.value.toLowerCase();
            const priceRange = priceFilter.value;
            
            let filteredCars = cars.filter(car => {
                const carName = `${car.make} ${car.model} ${car.year}`.toLowerCase();
                return carName.includes(searchTerm);
            });
            
            if (priceRange) {
                if (priceRange === '0-5000') {
                    filteredCars = filteredCars.filter(car => car.price < 5000);
                } else if (priceRange === '5000-10000') {
                    filteredCars = filteredCars.filter(car => car.price >= 5000 && car.price <= 10000);
                } else if (priceRange === '10000-20000') {
                    filteredCars = filteredCars.filter(car => car.price >= 10000 && car.price <= 20000);
                } else if (priceRange === '20000') {
                    filteredCars = filteredCars.filter(car => car.price > 20000);
                }
            }
            
            displayCars(filteredCars);
        }
        
        searchBtn.addEventListener('click', filterCars);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterCars();
            }
        });
        priceFilter.addEventListener('change', filterCars);
    }
    
    // Car Details Page Functionality
    if (document.getElementById('carTitle')) {
        // Get car ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const carId = parseInt(urlParams.get('id'));
        
        // Sample car data (same as in cars.html)
        const cars = [
            {
                id: 1,
                make: 'Honda',
                model: 'Civic',
                year: 2018,
                price: 18500,
                mileage: '45,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                color: 'Silver',
                image: 'hondacivic.jpg',
                description: 'This well-maintained 2018 Honda Civic LX comes with a clean title and has been regularly serviced. It features a 2.0L 4-cylinder engine, Bluetooth connectivity, rearview camera, and more. Great fuel economy and reliable performance.'
            },
            {
                id: 2,
                make: 'Toyota',
                model: 'Camry',
                year: 2019,
                price: 21500,
                mileage: '32,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                color: 'White',
                image: 'toyota.jpg',
                description: '2019 Toyota Camry SE with great features and excellent condition. Includes Apple CarPlay, Android Auto, blind spot monitoring, and a sunroof. Single owner with all service records available.'
            },
            {
                id: 3,
                make: 'Ford',
                model: 'F-150',
                year: 2017,
                price: 28500,
                mileage: '68,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                color: 'Black',
                image: 'ford.jpg',
                description: 'Powerful Ford F-150 XLT with towing package and crew cab. 3.5L EcoBoost V6 engine with 375 horsepower. Includes spray-in bedliner, tow hitch, and 4WD. Great for work or play.'
            },
            {
                id: 4,
                make: 'Chevrolet',
                model: 'Malibu',
                year: 2020,
                price: 19500,
                mileage: '28,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                color: 'Red',
                image: 'chevrolet.jpg',
                description: '2020 Chevrolet Malibu LT with premium sound system and leather seats. Features include heated front seats, dual-zone climate control, and advanced safety features like forward collision alert.'
            },
            {
                id: 5,
                make: 'BMW',
                model: '3 Series',
                year: 2016,
                price: 24500,
                mileage: '52,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                color: 'Blue',
                image: 'bmw.jpg',
                description: 'Luxury BMW 3 Series with navigation and premium package. 2.0L turbocharged engine with 248 horsepower. Includes sport seats, Harman Kardon sound system, and heads-up display.'
            },
            {
                id: 6,
                make: 'Hyundai',
                model: 'Tucson',
                year: 2021,
                price: 22500,
                mileage: '18,000 miles',
                transmission: 'Automatic',
                fuel: 'Gasoline',
                color: 'Gray',
                image: 'hyundai.jpg',
                description: 'Like-new 2021 Hyundai Tucson with all the latest features. Includes wireless charging, smart cruise control, lane keeping assist, and a panoramic sunroof. Still under factory warranty.'
            }
        ];
        
        // Find the car with the matching ID
        const car = cars.find(c => c.id === carId) || cars[0];
        
        // Populate car details
        document.getElementById('carTitle').textContent = `${car.year} ${car.make} ${car.model}`;
        document.getElementById('carPrice').textContent = `$${car.price.toLocaleString()}`;
        document.getElementById('carMileage').textContent = car.mileage;
        document.getElementById('carTransmission').textContent = car.transmission;
        document.getElementById('carFuel').textContent = car.fuel;
        document.getElementById('carColor').textContent = car.color;
        document.getElementById('carYear').textContent = car.year;
        document.getElementById('carDescription').textContent = car.description;
        document.getElementById('mainCarImage').src = car.image;
        
        // Set thumbnail click events
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Change main image
                document.getElementById('mainCarImage').src = `../images/car${index + 1}.jpg`;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Contact seller button
        const contactSellerBtn = document.getElementById('contactSellerBtn');
        const contactForm = document.getElementById('contactForm');
        
        contactSellerBtn.addEventListener('click', function() {
            contactForm.style.display = contactForm.style.display === 'none' ? 'block' : 'none';
        });
        
        // Message form submission
        const messageForm = document.getElementById('messageForm');
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your message has been sent to the seller!');
            contactForm.style.display = 'none';
            this.reset();
        });
        
        // Book test drive button
        const bookTestDriveBtn = document.getElementById('bookTestDriveBtn');
        bookTestDriveBtn.addEventListener('click', function() {
            // Store car info in localStorage to use on booking page
            localStorage.setItem('bookingCar', JSON.stringify({
                title: `${car.year} ${car.make} ${car.model}`,
                id: car.id
            }));
            
            window.location.href = 'booking.html';
        });
    }
    
    // Booking Page Functionality
    if (document.getElementById('bookingForm')) {
        // Get car info from localStorage
        const bookingCar = JSON.parse(localStorage.getItem('bookingCar'));
        
        if (bookingCar) {
            document.getElementById('bookingCarTitle').textContent = bookingCar.title;
        }
        
        // Booking form submission
        const bookingForm = document.getElementById('bookingForm');
        const bookingConfirmation = document.getElementById('bookingConfirmation');
        const returnToCarBtn = document.getElementById('returnToCarBtn');
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const phone = document.getElementById('bookingPhone').value;
            const date = document.getElementById('bookingDate').value;
            const time = document.getElementById('bookingTime').value;
            const notes = document.getElementById('bookingNotes').value;
            
            // Here you would typically send this data to a server
            // For demo purposes, we'll just show the confirmation
            
            // Show confirmation
            bookingConfirmation.style.display = 'flex';
            
            // Hide the form
            bookingForm.style.display = 'none';
        });
        
        // Return to car details button
        returnToCarBtn.addEventListener('click', function() {
            window.location.href = `car-details.html?id=${bookingCar.id}`;
        });
    }
});
