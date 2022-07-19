var TopicList;
$(document).ready(function() {
    // Datatable
    $('#practicesList').DataTable({
        initComplete: function() {
            this.api().columns().every(function() {
                if ($(this.header()).html() != "Name") /* cfa1 */
                    return; /* cfa1 */
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo($("#sort"))
                    .on('change', function() {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function(d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        },
        // "sDom": '<"top">rt<"bottom"p><"clear">',
        "sDom": '<"top"f>r<"H"t><"bottom"><"floatRight"p>',
        "ordering": false,
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true
    });
});


// Topic Cascading Select
$(document).ready(function() {
    $.ajax({
        url: "/QuizPractice/practicelist",
        method: "POST",
        data: { operation: "subject" },
        success: function(data, textStatus, jqXHR) {
            let obj = $.parseJSON(data);
            console.log(obj);
            $.each(obj, function(key, value) {

                $('#subject').append(`<option value="${value.s_id}" id="${value.name}">${value.name} </option>`)
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#subject').append('<option>Subject Unavailable</option>');
        },
        cache: false
    });


    $('#subject').change(function() {
        $('#topic').find('option').remove();
        $('#topic').append('<option value = "0">Select topic</option>');

        let s_id = document.getElementById("subject").value;

        let data = {
            operation: "topic",
            s_id: s_id,
        };

        $.ajax({
            url: "/QuizPractice/practicelist",
            method: "POST",
            data: data,
            success: function(data, textStatus, jqXHR) {
                let obj = $.parseJSON(data);
                console.log(obj);
                TopicList = obj;
                $.each(obj, function(key, value) {
                    $('#topic').append(`<option value="${value.topic_id}" id=" ${value.name}">${value.name} </option>`)
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#topic').append('<option>topic Unavailable</option>');
            },
            cache: false
        });
    });
});

// hiển thị ra danh sách câu hỏi
function RenderQuizzBody(JSData, action) {
    var length = Object.keys(JSData).length;
    setTime(length);
    var body = `
    <table class="table table-hover" id="Quizz">
    <thead>
        <tr>
            <th scope="col">Question Number </th>
            <th scope="col">Question</th>                                                 
        </tr>
    </thead>
    <tbody>
    `
    var i = 1;
    for (const [key, value] of Object.entries(JSData)) {
        console.log(value);
        body += `
            <tr>
            <th scope="row">${i}</br><span class="badge bg-secondary">Point: ${ Number.parseFloat(10/length).toFixed(2) }</span></th>
            <th scope="row"> 
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col"> ${key}</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <th scope="row"> Choose:</br> ${RenderOptions(value.options,value)}${value.status || action == 'render' ? '' : "Explain: " + value.description + "<br> Result: "+value.answer}</th> 
                    </tr>
                    </tbody>
                </table>
           </th>                                                                       
        </tr>`;
        i++;
    }

    body += `
            </tbody>
        </table>`;

    function RenderOptions(options, question) {
        var body = ``;

        for (var item in options) {

            body += `
                 <input type="radio" id="${question.content}_${options[item]}" name="${question.content}" value="${options[item]}" ${options[item] == question.answer && question.status ? 'checked' : ''}>
                 <label for="${question.content}_${options[item]}">${options[item]}</label></br>`

        }
        return body;
    }

    function setTime(value) {
        // value here is length of the quizz
        console.log("Length of quizz:" + value);
        // use second unit
        var totalTime = value * 108;
        //
        var min = Math.floor(totalTime / 60 - 1);
        var second = 60;

        console.log("Time set is " + totalTime);
        setInterval(() => {
            $('#quizzTimeSet').html(`
            Time: ${min}:${second}
            <input type="hidden" name="doTime" value="${min}:${second}">
            `);
            if (min == 0 && second == 0) {
                $('#QuizzForm').trigger('submit');
            }
            if (second == 0) {
                min--;
                second = 60;
            }
            second--;
        }, 1000);
    }
    return body;


}

function RenderQuizzReview(id) {

    $.post("/QuizPractice/Quizz", {
            action: 'get',
            id: id
        },
        function(data, status) {
            var JSData = JSON.parse(data);
            $("#DetailOf" + id).html(RenderQuizzBody(JSData, 'get'));
        });
}

//xứ lí câu hỏi
function RenderQuizzHandler(locate, id) {
    var subject = $("#subject" + id);
    var topic = $("#topic" + id);
    var level = $("#level" + id);
    var quantity = $("#quantity" + id);
    var action = action;

    // kiểm tra nếu id của subject có tồn tại để tải bài test hay không
    if (subject.val() > 0) {
        $("#" + locate).html(
            `<div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>`
        );

        function Random(list) {
            var max = list[list.length - 1].topic_id;
            var min = list[0].topic_id;
            return Math.floor(Math.random() * (max - min) + min);
        }
        //topicRes viết tắt của topic resquest tới controller
        var topicRes = topic.val() > 0 ? topic.val() : Random(TopicList);
        console.log(subject);
        console.log(topic);
        console.log(quantity);
        console.log(level);
        $.post("/QuizPractice/Quizz", {
                action: 'render',
                subject: subject.val(),
                topic: topicRes,
                level: level.val(),
                quantity: quantity.val()
            },
            // get data 
            function(data, status) {
                var JSData = JSON.parse(data);

                // input the length of quizz to set suitable time
                var body = `
                <form action="GradeController" method="Post" id="QuizzForm">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                        Subject: ${subject.children(":selected").attr("id")}</br>
                        Topic: ${topic.children(":selected").attr("id") != undefined ? topic.children(":selected").attr("id") : "Random"}</br>
                        Level: ${level.val() != "" ? level.val() : "Random" } </br> 
                        Quantity: ${ quantity.val() != "" ?  quantity.val() : "50"} </br>
                        <div id="quizzTimeSet"> </div>
                        </h5>
                    </div>
                    <input type="hidden"  name="topicId" value="${topicRes}">
                ${RenderQuizzBody(JSData,'render')}
        
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
        <script>
                $("#Quizz").DataTable();
        </script>
         `;
                $("#" + locate).html(body);

            });


    } else {
        $("#exampleModalLabel").html("Select Your Subject!");
    }


}