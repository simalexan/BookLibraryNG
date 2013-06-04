var book = {};
book.id = 1;
book.name = "Bugarska skupština";
book.author = "Igor Gašparević";

function fillUpData(){
    console.log("called");
    console.log("checking book id " + book.id);
    $('#BookID').html(book.id);
    $('#BookName').html(book.name);
    $('#BookAuthor').html(book.author);
}

//fillUpData();