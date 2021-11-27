var reservedSeats = {
    records1: {
        seat: "b19",
        owner: {
            fname: "Jenny",
            lname: "Augustin"
        }
    },
    records2: {
        seat: "d53",
        owner: {
            fname: "Lise C",
            lname: "Dugue"
        }
    },
    records3: {
        seat: "d49",
        owner: {
            fname: "Ashleyca C.",
            lname: "Dugue"
        }
    },
    records4: {
        seat: "e73",
        owner: {
            fname: "Roselaine",
            lname: "André"
        }
    }
};

function makeRows(sectionLength, rowLength, placement) {

    const rows = ["a", "b", "c", "d", "e", "f", "g"];

    let html = ""; let counter = 1;

    rows.forEach(row => {
        switch (placement) {
                //Add label to the left side
            case "left": html += `<div class="label">${row}</div>`; break;
                //add 12 to the counter
            case "right": counter = counter + (rowLength - sectionLength); break;
                //add three to the counter
            default: counter = counter + ((rowLength - sectionLength) / 2);
        } 
        
        for (let i = 0; i < sectionLength; i++) {
            html += `<div class="a" id="${row + counter}">${counter}</div>`;
            counter++;
        } 
        
        switch (placement) {
                //add 12 to the counter
            case "left": counter = counter + (rowLength - sectionLength); break;
                //Add label to the left side
            case "right": html += `<div class="label">${row}</div>`; break;
                //add three to the counter
            default: counter = counter + ((rowLength - sectionLength) / 2);
        }
    });
    

    document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, 'left');
makeRows(3, 15, 'right');
makeRows(9, 15, 'middle');

(function(){
    "use strict";


    let selectedSeats = [];
    const seats = document.querySelectorAll('.a');


    for(const key in reservedSeats){
        if ( reservedSeats.hasOwnProperty(key)){
            const obj = reservedSeats[key];
            //console.log(obj.seat);
    
            document.getElementById(obj.seat).className = 'r';
            document.getElementById(obj.seat).innerHTML = 'R';
        }
    }

    seats.forEach( seat => {
        seat.addEventListener('click', () => {
            //get the id of the seat
            //run seatSelectionProcess that adds it to the array
            
            seatSelectionProcess(seat.id)
        });
    });

    function seatSelectionProcess(thisSeat){
        //add seat to the array
        if(!document.getElementById(thisSeat).classList.contains('r')){
            const index = selectedSeats.indexOf(thisSeat);

            if (index > -1){
                //take the seat out of the array
                //set the class of the seat back to 'a'
                selectedSeats.splice(index, 1);
                document.getElementById(thisSeat).className = 'a';
            } else {
                //put the seat in the array
                //set the class of the seat to 's'
                selectedSeats.push(thisSeat);
                document.getElementById(thisSeat).className = 's';
            } manageConfirmForm();
            console.log(selectedSeats)
        }
    }

    document.getElementById('reserve').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'block';
    });

    document.getElementById('cancel').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'none';
    });

    function manageConfirmForm(){
        if (selectedSeats.length > 0){
            document.getElementById('confirmres').style.display = 'block';

            if (selectedSeats.length === 1){
                document.getElementById('selectedseats').innerHTML = `You have selected seat ${selectedSeats[0]}`;
            } else {
                let seatsString = selectedSeats.toString();
                seatsString = seatsString.replace(/,/g, ', ');
                seatsString = seatsString.replace(/,(?=[^,]*$)/, ' and');

            document.getElementById('selectedseats').innerHTML = `You have selected seats ${seatsString}`;
            }
        } else {
            document.getElementById('confirmres').style.display = 'none';

            document.getElementById('selectedseats').innerHTML = "You need to select some seats to reserve. <br/><a href='#' id='error'>Close</a> this dialog box and pick at least one seat.";

            document.getElementById('error').addEventListener('click', () => {
                document.getElementById('resform').style.display = 'none';
            })
        }
    }
    manageConfirmForm();

    document.getElementById('confirmres').addEventListener('submit', event =>{
        event.preventDefault();
        processReservation();
    });

    function processReservation(){
        //process the reservation
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach( thisSeat => {
            document.getElementById(thisSeat).className = 'r';
            document.getElementById(thisSeat).innerHTML = 'R';

            nextRecord = `record${hardCodeRecords + counter}`;
            reservedSeats[nextRecord] = {
                seat : thisSeat,
                owner : {
                    fname : fname,
                    lname : lname
                }
            };
            counter++;
        });

        //clean up
        document.getElementById('resform').style.display = "none";
        selectedSeats = [];
        manageConfirmForm();

        console.log(reservedSeats);
    }
}());
