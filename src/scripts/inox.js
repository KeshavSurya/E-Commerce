function startBooking(){

    document.getElementById('btnBook').innerText = "Book";
}


function btnBook(){

    document.getElementById("bookedTickets").style.display = "block";
    document.getElementById("noBookedTickets").style.display = "none";

    selectedMovie = document.getElementById('movieList').value;
    selectedDate = document.getElementById('dateList').value;
    selectedCinema = document.getElementById('cinemaList').value;
    selectedTime = document.getElementById('timeList').value;


    document.getElementById('lblMovie').innerText = selectedMovie;
    document.getElementById('lblDate').innerText = selectedDate;
    document.getElementById('lblCinema').innerText = selectedCinema;
    document.getElementById('lblTime').innerText = selectedTime;


}

function modifyBtn(){

    document.getElementById('modalHeader').innerText = "Modify Your Booking";
    document.getElementById('btnBook').innerText = "Modify";

}


function confirmBtn(){

    document.getElementById('footerBtns').innerHTML = "<h5 style='color:green;text-align:center;font-weight:bold;'> BOOKING CONFIRMED...! </h5>";
    alert("Your Ticket is successfully booked\nThank you...!")
}