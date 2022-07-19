function RenderExamList() {
    $.post('/QuizPractice/examslist', {},
        function(data, status) {
            $("#body").html(`
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        `);
            setTimeout(() => {

                $('#body').html(data);
            }, 0);
        })
}

function RenderQuestionList() {
    $.post('/QuizPractice/questionslist', {},
        function(data, status) {
            $("#body").html(`
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        `);
            setTimeout(() => {

                $('#body').html(data);
            }, 0);
        })
}