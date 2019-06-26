let toDoArray = [];
let savedToDo = localStorage.getItem('todo');
let degArray = ['deg-4','deg-3','deg-2','deg-1','deg1','deg2','deg3','deg4',];
$(document).ready(function(){
     if(savedToDo != undefined){
       let todoList=JSON.parse(savedToDo);
       for(let key in todoList){
            AddToDoItem(todoList[key]);
            if(todoList[key].isDone === true){
                console.log([key]);
                let li = $('.toDo-nav li');
                $(li[key]).addClass('completed');
            }
       }
     }
     $('.input-button').on('click', function(){
         let input_val = $('.input-text').val();
         let toDo = {
            text: input_val,
            isDone: false,
            time: Math.floor(Date.now()/1000)
         }
         if(toDo.text.length > 3){
             AddToDoItem(toDo);
             $('.input-text').val('');
         }
         else{
            alert('You should input more than 3 symbols');
         }
     });
     function AddToDoItem(obj){
         let rand = Math.floor(Math.random() * degArray.length);
         toDoArray.push(obj);
         localStorage.setItem('todo', JSON.stringify(toDoArray));
         $('<li/>',{class: "toDo-li" ,class: degArray[rand]}).append($('<span/>',{text: timeConverter(obj.time), class: "span-time"}),$('<span/>',{text: obj.text, class: "span-value"}), $('<div/>',{class: "deleteItem", html: '<i class="fas fa-times-circle"></i>', click: function(){
             let index = toDoArray.indexOf(obj);
             toDoArray.splice(index, 1);
             localStorage.setItem('todo', JSON.stringify(toDoArray));
             $(event.target).parent().parent().detach();
             
         }}), $('<div>',{class: "completedItem", html: '<i class="fas fa-check"></i>', click: function(){
             $(event.target).parent().parent().addClass('completed');
             obj.isDone = true;
             localStorage.setItem('todo', JSON.stringify(toDoArray));
         }})).appendTo($('.toDo-nav'));
     }
     function timeConverter(UNIX_timestamp){
         var t = new Date(UNIX_timestamp*1000);
         var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
         var year = t.getFullYear();
         var month = months[t.getMonth()];
         var date = t.getDate();
         var hour = t.getHours();
         var min = (t.getMinutes() < 10) ? "0"+t.getMinutes() : t.getMinutes();
         var sec = (t.getSeconds() < 10) ? "0"+t.getSeconds() : t.getSeconds();
         var dateTime = date+' '+month+' '+year+' '+hour+':'+min+':'+sec ;
         return dateTime;
     }
});