var getByName = document.getElementsByName.bind(document);

function UpdateUser(User) {
    console.log(getByName("id of " + User)[0].value);
    console.log(getByName("fname of " + User)[0].value);
    console.log(getByName("lname of " + User)[0].value);
    console.log(getByName("dob of " + User)[0].value);
    console.log(getByName("gender of " + User)[0].checked ? 'm' : 'f');
    console.log(getByName("des of " + User)[0].value);
    console.log(getByName("phone of " + User)[0].value);
    console.log(getByName("address of " + User)[0].value);
    console.log(getByName("visa of " + User)[0].value);
    console.log(getByName("payment of " + User)[0].value);
    console.log(getByName("position of " + User)[0].value);
    console.log(getByName("sign of " + User)[0].value);
    console.log(getByName("company of " + User)[0].value);
    console.log(getByName("school of " + User)[0].value);
    console.log(getByName("subject registered of" + User).value);
    $.post("/QuizPractice/EditProfileController", {
            id: getByName("id of " + User)[0].value,
            password: getByName("password of " + User)[0].value,
            fname: getByName("fname of " + User)[0].value,
            lname: getByName("lname of " + User)[0].value,
            birth: getByName("dob of " + User)[0].value,
            gender: getByName("gender of " + User)[0].checked ? 'm' : 'f',
            description: getByName("des of " + User)[0].value,
            phonenum: getByName("phone of " + User)[0].value,
            address: getByName("address of " + User)[0].value,
            visa: getByName("visa of " + User)[0].value,
            paymethod: getByName("payment of " + User)[0].value,
            position: getByName("position of " + User)[0].value,
            sign: getByName("sign of " + User)[0].value,
            company: getByName("company of " + User)[0].value,
            school: getByName("school of " + User)[0].value
        },
        function(data, status) {
            alert("Update success!");
            $(".saveBtn").attr("disabled", "disabled");
        })


}

function UpdateQuestion(Question) {
    console.log(getByName("ot0_" + Question)[0].value);
    console.log(getByName("ot1_" + Question)[0].value);
    console.log(getByName("ot2_" + Question)[0].value);
    console.log(getByName("ot3_" + Question)[0].value);
    $.post("/QuizPractice/QuestionManageController", {
            id: getByName("id_" + Question)[0].value,
            type: getByName("type_" + Question)[0].value,
            lessonId: getByName("lessonId_" + Question)[0].value,
            content: getByName("content_" + Question)[0].value,
            answer: getByName("answer_" + Question)[0].value,
            level: getByName("level_" + Question)[0].value,
            description: getByName("description_" + Question)[0].value,
            image: getByName("image_" + Question)[0].value,
            ot0: getByName("ot0_" + Question)[0].value,
            ot1: getByName("ot1_" + Question)[0].value,
            ot2: getByName("ot2_" + Question)[0].value,
            ot3: getByName("ot3_" + Question)[0].value
        },
        function(data, status) {
            RenderQuestionList();
            $('div').remove('div.show');
        })
}

function DeleteQuestion(id) {
    $.post("/QuizPractice/QuestionManageController", {
            id: id,
            type: "delete",
        },
        function(data, status) {
            RenderQuestionList();
            $('div').remove('div.show');
        })
}
// edit exam
function UpdateExam(Exam) {
    $.post("/QuizPractice/ExamManageController", {
            examId: getByName("examId_" + Exam)[0].value,
            type: getByName("type_" + Exam)[0].value,
            uId: getByName("uId_" + Exam)[0].value,
            sId: getByName("sId_" + Exam)[0].value,
            level: getByName("level_" + Exam)[0].value,
            numberOfQuestion: getByName("numberOfQuestion_" + Exam)[0].value,
            duration: getByName("duration_" + Exam)[0].value,
            passrate: getByName("passrate_" + Exam)[0].value,
            status: getByName("status_" + Exam)[0].value
        },
        function(data, status) {
            RenderExamList();
            $('div').remove('div.show');
        })
}
//active exam
function ActiveExam(id) {
    $.post("/QuizPractice/ExamManageController", {
            examId: id,
            type: "active",
        },
        function(data, status) {
            RenderExamList();
        })
}
// deactive exam
function DeactiveExam(id) {
    $.post("/QuizPractice/ExamManageController", {
            examId: id,
            type: "deactive",
        },
        function(data, status) {
            RenderExamList();
        })
}
//delete exam
function DeleteExam(id) {
    $.post("/QuizPractice/ExamManageController", {
            examId: id,
            type: "delete",
        },
        function(data, status) {
            RenderExamList();
            $('div').remove('div.show');
        })
}

//add new user
function Addnew() {
    console.log(getByName("id of new")[0].value);
    console.log(getByName("fname of new")[0].value);
    console.log(getByName("lname of new")[0].value);
    console.log(getByName("dob of new")[0].value);
    console.log(getByName("gender of new")[0].checked ? 'm' : 'f');
    console.log(getByName("des of new")[0].value);
    console.log(getByName("phone of new")[0].value);
    console.log(getByName("address of new")[0].value);
    console.log(getByName("visa of new")[0].value);
    console.log(getByName("payment of new")[0].value);
    console.log(getByName("position of new")[0].value);
    console.log(getByName("sign of new")[0].value);
    console.log(getByName("company of new")[0].value);
    console.log(getByName("school of new")[0].value);
    console.log(getByName("subject registered ofnew").value);
    $.post("/QuizPractice/registercontroller", {
            username: getByName("account of new")[0].value,
            password: getByName("password of new")[0].value,
            firstname: getByName("fname of new")[0].value,
            lastname: getByName("lname of new")[0].value,
            date: getByName("dob of new")[0].value,
            gender: getByName("gender of new")[0].checked ? 'm' : 'f',
            description: getByName("des of new")[0].value,
            phonenum: getByName("phone of new")[0].value,
            address: getByName("address of new")[0].value,
            visa: getByName("visa of new")[0].value,
            paymethod: getByName("payment of new")[0].value,
            position: getByName("position of new")[0].value,
            sign: getByName("sign of new")[0].value,
            company: getByName("company of new")[0].value,
            school: getByName("school of new")[0].value,
            status: '1'
        },
        function(data, status) {
            alert("Update success!");
            $(".saveBtn").attr("disabled", "disabled");
        })


}