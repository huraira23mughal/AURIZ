// ── STATE MANAGEMENT ──
let availableBalance = 124.83;
let personalIncome = 146.83;
let vouchersBalance = 245;
let currentUsername = "";
let registeredEmail = "";

// Mock albums data
const albums = [
  {
    id: 1,
    title: "BORN PINK",
    artist: "BLACKPINK",
    price: 10.00,
    profitRate: 0.03, // 3%
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60",
    artistImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60",
    description: "BORN PINK is the second studio album by South Korean girl group BLACKPINK. Releasing multiple records with secure secondary market payouts."
  },
  {
    id: 2,
    title: "FEFE DOBSON",
    artist: "ALan",
    price: 13.00,
    profitRate: 0.03, // 3%
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60",
    artistImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
    description: "Fefe Dobson's premium remix launch including acoustic tracks and secondary license rights under regional streaming platforms."
  },
  {
    id: 3,
    title: "AARON SMITH",
    artist: "Aaron Smith",
    price: 18.00,
    profitRate: 0.03, // 3%
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60",
    artistImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    description: "Aaron Smith's indie folk release options. Provides daily royalty distributions directly back to ticket option holders."
  },
  {
    id: 4,
    title: "ANTHEM LIGHTS",
    artist: "Anthem Lights",
    price: 30.00,
    profitRate: 0.035, // 3.5%
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=60",
    artistImage: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60",
    description: "Premium choral tracks. Lock-in ticket rights to maximize release week streaming numbers and local concert tour allocation."
  },
  {
    id: 5,
    title: "ALVARO SOLER",
    artist: "Alvaro Soler",
    price: 50.00,
    profitRate: 0.04, // 4%
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=60",
    artistImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60",
    description: "Latin chart-topper Alvaro Soler's special summer concert release options. Highest standard tier options with premium secondary returns."
  }
];

// Active investments
let processingInvestments = [
  {
    id: 101,
    albumTitle: "BORN PINK",
    artist: "BLACKPINK",
    price: 20.00,
    profit: 0.60,
    timeLeft: 45, // seconds for demo
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60"
  }
];

let completedInvestments = [
  {
    id: 99,
    albumTitle: "AARON SMITH",
    artist: "Aaron Smith",
    price: 18.00,
    profit: 0.54,
    date: "Today, 14:22",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60"
  }
];

// Stepper selection
let selectedAlbum = null;
let purchaseQty = 1;

// Audio player state
let isPlayingAudio = false;
let audioTimerInterval = null;
let audioSecondsPlayed = 0;

// Carousel State
let currentCarouselSlide = 0;
let carouselInterval = null;

// ── INITIALIZATION ──
document.addEventListener("DOMContentLoaded", () => {
  renderHitRecords();
  updateUIBalances();
  startCarouselAutoPlay();
  startInvestmentCountdown();
});

// ── AUTHENTICATION FLOWS ──

function switchAuthView(viewName) {
  const registerView = document.getElementById("register-view");
  const loginView = document.getElementById("login-view");
  
  if (viewName === "login") {
    registerView.classList.remove("active");
    loginView.classList.add("active");
  } else {
    loginView.classList.remove("active");
    registerView.classList.add("active");
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Strict email regex check
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getVerificationCode() {
  const emailInput = document.getElementById("reg-email");
  const email = emailInput.value.trim();
  const emailError = document.getElementById("reg-email-error");
  const codeInfo = document.getElementById("code-info");

  if (!email) {
    emailError.textContent = "Please enter email first.";
    return;
  }
  
  if (!isValidEmail(email)) {
    emailError.textContent = "Invalid email format. E.g., user@domain.com";
    return;
  }
  
  emailError.textContent = "";
  
  // Simulate code dispatch
  let code = Math.floor(1000 + Math.random() * 9000);
  codeInfo.textContent = `Verification code sent! Mock code: ${code}`;
  document.getElementById("reg-code").value = code;
  
  showToast("Code sent successfully!");
}

function handleRegister(event) {
  event.preventDefault();
  
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;
  const txPassword = document.getElementById("reg-tx-password").value;
  const agree = document.getElementById("reg-agree").checked;
  const emailError = document.getElementById("reg-email-error");
  
  if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    return;
  }
  
  if (password.length < 6 || password.length > 15) {
    alert("Password must be between 6 and 15 digits.");
    return;
  }
  
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (txPassword.length !== 6 || isNaN(txPassword)) {
    alert("Transaction password must be a 6-digit numeric PIN.");
    return;
  }
  
  if (!agree) {
    alert("You must agree to the Terms of Use Agreement.");
    return;
  }
  
  // Cache user details
  registeredEmail = email;
  currentUsername = email.split('@')[0];
  
  showToast("Account registered successfully!");
  
  // Transition to login view automatically
  setTimeout(() => {
    document.getElementById("login-email").value = email;
    switchAuthView("login");
  }, 1000);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const emailError = document.getElementById("login-email-error");
  
  if (!isValidEmail(email) && !email.includes("alex")) {
    emailError.textContent = "Please enter a valid email address.";
    return;
  }
  
  emailError.textContent = "";
  
  // Mock login success
  currentUsername = email.includes("@") ? email.split('@')[0] : email;
  document.getElementById("mine-username").textContent = currentUsername;
  
  showToast("Logging in...");
  
  setTimeout(() => {
    document.getElementById("auth-container").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");
    updateUIBalances();
  }, 1200);
}

// Google Auth Simulation
function handleGoogleAuth(mode) {
  showToast(`Connecting to Google account...`);
  
  setTimeout(() => {
    currentUsername = "google_user_" + Math.floor(100 + Math.random() * 900);
    document.getElementById("mine-username").textContent = currentUsername;
    
    showToast(`Google Login Successful! Welcome ${currentUsername}`);
    
    setTimeout(() => {
      document.getElementById("auth-container").classList.add("hidden");
      document.getElementById("app-container").classList.remove("hidden");
      updateUIBalances();
    }, 1000);
  }, 1500);
}

function handleLogout() {
  showToast("Logging out...");
  setTimeout(() => {
    document.getElementById("app-container").classList.add("hidden");
    document.getElementById("auth-container").classList.remove("hidden");
  }, 1000);
}

// ── NAVIGATION FLOWS ──

function switchAppView(viewName) {
  // Hide all views
  const views = ["home", "income", "task", "finance", "mine"];
  views.forEach(v => {
    document.getElementById(`${v}-view`).classList.remove("active");
    document.getElementById(`nav-${v}`).classList.remove("active");
  });
  
  // Show active view
  document.getElementById(`${viewName}-view`).classList.add("active");
  document.getElementById(`nav-${viewName}`).classList.add("active");
  
  if (viewName === "mine" || viewName === "home" || viewName === "income") {
    updateUIBalances();
  }
}

// ── VIEW UPDATES & RENDERS ──

function updateUIBalances() {
  // Update Mine balance text
  document.getElementById("val-personal-income").textContent = personalIncome.toFixed(2);
  document.getElementById("val-available-balance").textContent = availableBalance.toFixed(2);
  document.getElementById("payment-avail-balance").textContent = `$${availableBalance.toFixed(2)}`;
  document.getElementById("withdraw-max-balance").textContent = `$${availableBalance.toFixed(2)}`;
  
  // Update Vouchers
  document.getElementById("task-vouchers-balance").textContent = vouchersBalance;
  document.getElementById("payment-voucher-listening").textContent = `${vouchersBalance} Vouchers`;
  
  // Render lists
  renderIncomeLists();
}

function renderHitRecords() {
  const container = document.getElementById("hit-records-list");
  container.innerHTML = "";
  
  albums.forEach(album => {
    const card = document.createElement("div");
    card.className = "album-card";
    card.innerHTML = `
      <img src="${album.image}" alt="${album.title}">
      <div class="album-card-details">
        <div>
          <h4>${album.title}</h4>
          <p>${album.artist}</p>
        </div>
        <div class="album-card-bottom">
          <span class="album-price">$${album.price.toFixed(2)}</span>
          <button class="btn-purchase-card" onclick="openPurchaseDrawer(${album.id})">Purchase</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderIncomeLists() {
  const processingContainer = document.getElementById("processing-list");
  const completeContainer = document.getElementById("complete-list");
  
  processingContainer.innerHTML = "";
  completeContainer.innerHTML = "";
  
  // 1. Render Processing
  if (processingInvestments.length === 0) {
    processingContainer.innerHTML = `<div class="empty-state">No processing ticket releases.</div>`;
  } else {
    processingInvestments.forEach(item => {
      const card = document.createElement("div");
      card.className = "income-record-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.albumTitle}">
        <div class="income-card-meta">
          <h4>${item.albumTitle}</h4>
          <p>${item.artist}</p>
          <div class="timer-box" id="timer-${item.id}">Settlement: ${item.timeLeft}s</div>
        </div>
        <div class="income-payout">
          <span class="price">$${item.price.toFixed(2)}</span>
          <p class="profit">+${item.profit.toFixed(2)} (est.)</p>
        </div>
      `;
      processingContainer.appendChild(card);
    });
  }
  
  // 2. Render Completed
  if (completedInvestments.length === 0) {
    completeContainer.innerHTML = `<div class="empty-state">No completed ticket releases.</div>`;
  } else {
    completedInvestments.forEach(item => {
      const card = document.createElement("div");
      card.className = "income-record-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.albumTitle}">
        <div class="income-card-meta">
          <h4>${item.albumTitle}</h4>
          <p>${item.artist}</p>
          <span class="info-text">${item.date}</span>
        </div>
        <div class="income-payout">
          <span class="price">$${item.price.toFixed(2)}</span>
          <p class="profit">+${item.profit.toFixed(2)} (Paid)</p>
        </div>
      `;
      completeContainer.appendChild(card);
    });
  }
}

function switchIncomeSegment(segmentName) {
  const procBtn = document.getElementById("tab-processing");
  const compBtn = document.getElementById("tab-complete");
  const procList = document.getElementById("processing-list");
  const compList = document.getElementById("complete-list");
  
  if (segmentName === "processing") {
    procBtn.classList.add("active");
    compBtn.classList.remove("active");
    procList.classList.add("active");
    compList.classList.remove("active");
  } else {
    compBtn.classList.add("active");
    procBtn.classList.remove("active");
    compList.classList.add("active");
    procList.classList.remove("active");
  }
}

// ── CAROUSEL AUTO PLAY ──

function startCarouselAutoPlay() {
  carouselInterval = setInterval(() => {
    currentCarouselSlide = (currentCarouselSlide + 1) % 3;
    setCarouselSlide(currentCarouselSlide);
  }, 4000);
}

function setCarouselSlide(index) {
  currentCarouselSlide = index;
  const slides = document.getElementById("carousel-slides");
  slides.style.transform = `translateX(-${index * 33.333}%)`;
  
  // update dots
  const dots = document.querySelectorAll("#carousel-dots .dot");
  dots.forEach((dot, idx) => {
    if (idx === index) dot.classList.add("active");
    else dot.classList.remove("active");
  });
}

// ── PURCHASE DRAWER (BOTTOM SHEET) ──

function openPurchaseDrawer(albumId) {
  selectedAlbum = albums.find(a => a.id === albumId);
  purchaseQty = 1;
  
  // Populate
  document.getElementById("drawer-album-title").textContent = `${selectedAlbum.title} Detail`;
  document.getElementById("drawer-album-img").src = selectedAlbum.image;
  document.getElementById("drawer-album-description").textContent = selectedAlbum.description;
  document.getElementById("drawer-artist-img").src = selectedAlbum.artistImage;
  document.getElementById("drawer-artist-name").textContent = selectedAlbum.artist;
  document.getElementById("purchase-quantity").value = purchaseQty;
  
  updateDrawerCalculations();
  
  // Slide up
  document.getElementById("purchase-backdrop").classList.remove("hidden");
  document.getElementById("purchase-drawer").classList.remove("hidden");
}

function closePurchaseDrawer() {
  document.getElementById("purchase-backdrop").classList.add("hidden");
  document.getElementById("purchase-drawer").classList.add("hidden");
}

function changePurchaseQty(val) {
  purchaseQty += val;
  if (purchaseQty < 1) purchaseQty = 1;
  document.getElementById("purchase-quantity").value = purchaseQty;
  updateDrawerCalculations();
}

function updateDrawerCalculations() {
  if (!selectedAlbum) return;
  
  const price = selectedAlbum.price;
  const total = price * purchaseQty;
  const profit = total * selectedAlbum.profitRate;
  
  document.getElementById("drawer-total-amount").textContent = total.toFixed(2);
  document.getElementById("drawer-estimated-profit").textContent = profit.toFixed(2);
  
  // Validate balance
  updatePaymentModeSelection();
}

function updatePaymentModeSelection() {
  if (!selectedAlbum) return;
  const mode = document.querySelector('input[name="payment-type"]:checked').value;
  const price = selectedAlbum.price;
  const total = price * purchaseQty;
  const btn = document.getElementById("btn-confirm-purchase");
  
  if (mode === "balance") {
    if (availableBalance < total) {
      btn.classList.add("disabled");
      btn.style.opacity = "0.5";
      btn.textContent = "Insufficient Balance";
    } else {
      btn.classList.remove("disabled");
      btn.style.opacity = "1";
      btn.textContent = "Confirm purchase";
    }
  } else {
    // Voucher mode (costs 10 vouchers per ticket)
    const requiredVouchers = purchaseQty * 10;
    if (vouchersBalance < requiredVouchers) {
      btn.classList.add("disabled");
      btn.style.opacity = "0.5";
      btn.textContent = `Need ${requiredVouchers} Vouchers`;
    } else {
      btn.classList.remove("disabled");
      btn.style.opacity = "1";
      btn.textContent = "Confirm purchase (Vouchers)";
    }
  }
}

function confirmPurchase() {
  const btn = document.getElementById("btn-confirm-purchase");
  if (btn.classList.contains("disabled")) return;
  
  const mode = document.querySelector('input[name="payment-type"]:checked').value;
  const price = selectedAlbum.price;
  const total = price * purchaseQty;
  const profit = total * selectedAlbum.profitRate;
  
  if (mode === "balance") {
    availableBalance -= total;
  } else {
    vouchersBalance -= (purchaseQty * 10);
  }
  
  // Add to processing
  const newInvest = {
    id: Date.now(),
    albumTitle: selectedAlbum.title,
    artist: selectedAlbum.artist,
    price: total,
    profit: profit,
    timeLeft: 30, // seconds countdown for interactive demo
    image: selectedAlbum.image
  };
  
  processingInvestments.unshift(newInvest);
  
  showToast("Ticket option successfully purchased!");
  closePurchaseDrawer();
  updateUIBalances();
  
  // Switch to Income tab
  setTimeout(() => {
    switchAppView("income");
    switchIncomeSegment("processing");
  }, 300);
}

// Countdown loop
function startInvestmentCountdown() {
  setInterval(() => {
    let changed = false;
    
    processingInvestments = processingInvestments.filter(item => {
      item.timeLeft -= 1;
      
      // Update UI if element exists
      const el = document.getElementById(`timer-${item.id}`);
      if (el) {
        el.textContent = `Settlement: ${item.timeLeft}s`;
      }
      
      if (item.timeLeft <= 0) {
        // Complete! Add earnings
        availableBalance += (item.price + item.profit);
        personalIncome += item.profit;
        
        // Add to completed list
        completedInvestments.unshift({
          id: item.id,
          albumTitle: item.albumTitle,
          artist: item.artist,
          price: item.price,
          profit: item.profit,
          date: "Just now",
          image: item.image
        });
        
        changed = true;
        return false; // remove from processing
      }
      return true;
    });
    
    if (changed) {
      updateUIBalances();
      showToast("Income cycle complete! Funds added to balance.");
    }
  }, 1000);
}

// ── TASK INTERACTIONS ──

let claimedCheckin = false;
let claimedAudio = false;

function claimCheckin() {
  if (claimedCheckin) return;
  vouchersBalance += 5;
  claimedCheckin = true;
  
  const checkinCard = document.getElementById("task-checkin");
  const btn = checkinCard.querySelector(".btn-action");
  btn.classList.add("claimed");
  btn.textContent = "Claimed";
  
  showToast("Check-in reward claimed! +5 Vouchers");
  updateUIBalances();
  updateCompletedTasksCount();
}

function playMockAudio() {
  if (isPlayingAudio) return;
  
  isPlayingAudio = true;
  audioSecondsPlayed = 0;
  
  const playBtn = document.getElementById("btn-audio-play");
  playBtn.textContent = "Playing...";
  playBtn.classList.add("disabled");
  
  audioTimerInterval = setInterval(() => {
    audioSecondsPlayed += 1;
    const progressPct = (audioSecondsPlayed / 15) * 100;
    
    document.getElementById("audio-progress").style.width = `${progressPct}%`;
    document.getElementById("audio-timer").textContent = `0:${audioSecondsPlayed < 10 ? '0' : ''}${audioSecondsPlayed} / 0:15`;
    
    if (audioSecondsPlayed >= 15) {
      clearInterval(audioTimerInterval);
      isPlayingAudio = false;
      playBtn.textContent = "Completed";
      
      // Enable claim
      const claimBtn = document.getElementById("btn-claim-listen");
      claimBtn.classList.remove("disabled");
    }
  }, 1000);
}

function claimListenReward() {
  const claimBtn = document.getElementById("btn-claim-listen");
  if (claimBtn.classList.contains("disabled") || claimedAudio) return;
  
  vouchersBalance += 10;
  claimedAudio = true;
  
  claimBtn.classList.add("claimed");
  claimBtn.textContent = "Claimed";
  
  showToast("Audio task reward claimed! +10 Vouchers");
  updateUIBalances();
  updateCompletedTasksCount();
}

function updateCompletedTasksCount() {
  let count = 0;
  if (claimedCheckin) count++;
  if (claimedAudio) count++;
  document.getElementById("completed-count").textContent = count;
}

function showInviteLink() {
  const link = `https://auriz-portal.com/register?code=TDS53m`;
  navigator.clipboard.writeText(link).then(() => {
    showToast("Invite link copied to clipboard!");
  }).catch(() => {
    alert(`Invite Link: ${link}`);
  });
}

// ── FINANCE PLAN INTERACTIONS ──

function subscribeTier(rate, title) {
  const inputAmt = prompt(`Enter investment amount to lock in ${title} (${rate}% yield):`, "100.00");
  if (inputAmt === null) return;
  
  const amt = parseFloat(inputAmt);
  if (isNaN(amt) || amt <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }
  
  if (availableBalance < amt) {
    alert("Insufficient funds in available balance.");
    return;
  }
  
  // Deduct
  availableBalance -= amt;
  const profit = amt * (rate / 100);
  
  // Add to processing
  processingInvestments.unshift({
    id: Date.now(),
    albumTitle: `${title} Subscription`,
    artist: "Locked Yield",
    price: amt,
    profit: profit,
    timeLeft: 60, // locked yield cycle (60 seconds for demo)
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=60"
  });
  
  showToast("Yield subscription active!");
  updateUIBalances();
  
  setTimeout(() => {
    switchAppView("income");
    switchIncomeSegment("processing");
  }, 300);
}

// ── RECHARGE FLOWS ──

function openRechargeView() {
  document.getElementById("recharge-view-panel").classList.remove("hidden");
}

function closeRechargeView() {
  document.getElementById("recharge-view-panel").classList.add("hidden");
  document.getElementById("recharge-order-modal").classList.add("hidden");
  document.getElementById("recharge-amount").value = "";
}

function setRechargePreset(amt) {
  document.getElementById("recharge-amount").value = amt;
}

function proceedRechargeOrder() {
  const amt = parseFloat(document.getElementById("recharge-amount").value);
  if (isNaN(amt) || amt < 10) {
    alert("Minimum recharge threshold is 10 USDT.");
    return;
  }
  
  document.getElementById("order-total-usdt").textContent = `${amt.toFixed(2)} USDT`;
  document.getElementById("recharge-order-modal").classList.remove("hidden");
}

function simulatePaymentConfirm() {
  const amt = parseFloat(document.getElementById("recharge-amount").value);
  availableBalance += amt;
  
  showToast(`Recharge detected! +$${amt.toFixed(2)} credited.`);
  closeRechargeView();
  updateUIBalances();
}

// ── WITHDRAWAL FLOWS ──

function openWithdrawView() {
  document.getElementById("withdraw-view-panel").classList.remove("hidden");
}

function closeWithdrawView() {
  document.getElementById("withdraw-view-panel").classList.add("hidden");
  document.getElementById("withdraw-amount").value = "";
  document.getElementById("withdraw-address").value = "";
  document.getElementById("withdraw-tx-pass").value = "";
}

function proceedWithdraw() {
  const amt = parseFloat(document.getElementById("withdraw-amount").value);
  const address = document.getElementById("withdraw-address").value.trim();
  const txPass = document.getElementById("withdraw-tx-pass").value;
  
  if (isNaN(amt) || amt <= 0) {
    alert("Please enter a valid withdrawal amount.");
    return;
  }
  
  if (availableBalance < amt) {
    alert("Insufficient funds to complete this withdrawal request.");
    return;
  }
  
  if (!address.startsWith("T") || address.length < 30) {
    alert("Please enter a valid TRC20 destination address starting with T.");
    return;
  }
  
  if (txPass.length !== 6 || isNaN(txPass)) {
    alert("Incorrect transaction password PIN code format.");
    return;
  }
  
  availableBalance -= amt;
  showToast(`Withdrawal of $${amt.toFixed(2)} submitted!`);
  closeWithdrawView();
  updateUIBalances();
}

// ── UTILS ──

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

function showAgreement() {
  document.getElementById("agreement-backdrop").classList.remove("hidden");
  document.getElementById("agreement-popup").classList.remove("hidden");
}

function closeAgreement() {
  document.getElementById("agreement-backdrop").classList.add("hidden");
  document.getElementById("agreement-popup").classList.add("hidden");
}

function showMenuItem(label) {
  alert(`User Center Action: Open ${label}`);
}

function showMembershipTiers() {
  alert("Membership levels:\nLV1: $10 - $299 (3.0% daily)\nLV2: $300 - $999 (3.5% daily)\nLV3: $1000+ (4.0% daily)");
}
