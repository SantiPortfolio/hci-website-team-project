function showOffer() {
    if (!localStorage.getItem('visited')) {
      setTimeout(function() {
        alert("Special Promotion! Get 20% off on all items. Limited time offer. Use Code: 20OFF");
      }, 2000); // 2 seconds delay
        localStorage.setItem('visited', true);
    }
}