$(document).ready(function () {
// ===============================================
  var questions = [
    {
      question: 'Name the other Stark child?',
      answers: [
        'Rickon',
        'Dickon',
        'Ramsay',
        'Eddard'
      ],
      answer: 'Rickon'
    },
    {
      question: 'What\'s the name of the explosive that gave the Lannisters the edge in the Battle of Blackwater?',
      answers: [
        'Dragonfire',
        'Godsfire',
        'Wildfire',
        'Pantsonfire'
      ],
      answer: 'Wildfire'
    },
    {
      question: 'How is the "The Queen of Thorns" more commonly known?',
      answers: [
        'Cersei Lannister',
        'Margaery Tyrell',
        'Olenna Tyrell',
        'E Jarvis Thribb'
      ],
      answer: 'Olenna Tyrell'
    },
    {
      question: 'Which Lannister song signaled doom at the Red Wedding?',
      answers: [
        'A Gold Crown',
        'The Rains of Castermine',
        'The Cones of Dunshire',
        'Royal Cups'
      ],
      answer: 'The Rains of Castermine'
    },
    {
      question: 'Who said \'Go drink until it feels like you did the right thing\'?',
      answers: [
        'Tyrion Lannister',
        'Littlefinger',
        'Kelis',
        'Bronn'
      ],
      answer: 'Bronn'
    }
  ]

  var score = {
    currentRight: 0,
    currentWrong: 0,
    gameStarted: false
  }
  // ==============================================
  var counter = 0
  var globalTimer

  // Onclick to start game and show sections
  $('#Dashboard--button').on('click', function () {
    $('#Dashboard').hide()
    $('#Dashboard--button').hide()
    $('.Main').show()
  })

  $('#Dashboard--restart').on('click', function () {
    gameRestart()
  })

  function setQuestion () {
    $('#question').text(questions[counter].question)
    $('.Section--ul').show()
  }

  function setAnswers () {
    $('.answer').each(function (index) {
      $(this).text(questions[counter].answers[index])
    })
  }

  function setOnClick () {
    $('.answer').each(function (index) {
      $(this).on('click', function () {
        var ansLocal = $(this).text()
        var ansGlobal = questions[counter].answer
        console.log('local', ansLocal)
        console.log('global', ansLocal)
        ansLocal === ansGlobal ? rightAnswer() : wrongAnswer()
      })
    })
  }

  function changeQuestion () {
    $('.answer').each(function () { $(this).off() })
    $('#Div--right, #Div--wrong').hide()
    if (counter >= questions.length - 1) { return gameOver() }
    counter++
    setQuestion()
    setAnswers()
    setOnClick()
    console.log('counter', counter)
    console.log('changeQuestion')
  }

  function rightAnswer () {
    score.currentRight++
    console.log('rightAnswer', score.currentRight)
    $('.Section--ul').hide()
    $('#Div--right').show()
    setTimeout(changeQuestion, 1000)
  }

  function wrongAnswer () {
    score.currentWrong++
    console.log('wrongAnswer', score.currentWrong)
    $('.Section--ul').hide()
    $('#Div--wrong').show()
    setTimeout(changeQuestion, 1000)
  }

  function timerStart () {
    globalTimer = setInterval(clock, 1000)
  }

  function timerStop () {
    clearInterval(globalTimer)
  }

  function clock () {
    var time = $('#timeRemaining').text()
    time = parseInt(time) - 1
    $('#timeRemaining').text(time)
    console.log('clock', time)
    checkTime(time)
  }

  function checkTime (time) {
    if (time === 0) { gameOver() }
  }

  function gameOver () {
    timerStop()
    $('.Main').hide()
    $('#right').text(score.currentRight)
    $('#wrong').text(score.currentWrong)
    $('#Dashboard, #Dashboard--section').show()
  }

  function gameRestart () {
    score.currentWrong = 0
    score.currentRight = 0
    $('#timeRemaining').text('45')
    counter = 0
    $('#Dashboard').hide()
    $('.Main').show()
    setQuestion()
    setAnswers()
    setOnClick()
    timerStart()
  }

  setQuestion()
  setAnswers()
  setOnClick()
  timerStart()
})
