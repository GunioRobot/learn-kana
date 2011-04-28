window.onload = function(){

  words = generate_word_list(level, available_words);
  var kana = set_new_word(words);
  var romaji = transliterate(kana);

  var quiz = document.getElementById('quiz');
  var preferences = document.getElementById('preferences');
  var meta = document.getElementById('meta');


  /* Temp: */
  generate_checkboxes();

  var input = document.getElementById('input');

  input.focus();

  input.onkeypress = function(e) {
    if (!e) {
      e = window.event; /* Hello, IE. */
    }

    if ((e.keyCode == 13) ) {
      if (input.value.toLowerCase() == romaji) {
        show_result('Correct', kana, romaji);
      } else {
        show_result('Wrong', kana, romaji);
      }
      kana = set_new_word(words);
      romaji = transliterate(kana);
      input.value = '';
      input.focus();
    }
  }


  /* Toggle dialogs */
  document.getElementById('prefs').onclick = function() {
    quiz.setAttribute('class', 'hidden');
    preferences.setAttribute('class', 'visible');
  }

  document.getElementById('about').onclick = function() {
    quiz.setAttribute('class', 'hidden');
    meta.setAttribute('class', 'visible');
  }

  /* FIXME: Combine the two following listeners */
  document.getElementById('return_chars').onclick = function() {
    quiz.setAttribute('class', 'visible');
    preferences.setAttribute('class', 'hidden');
  }

  document.getElementById('return_about').onclick = function() {
    quiz.setAttribute('class', 'visible');
    meta.setAttribute('class', 'hidden');
  }
}


/* Dim the footer if there is no mouse movement */

dim = setTimeout(hide, 10000);

function hide() {
  document.getElementById('footer').setAttribute('class', 'hide');
}

document.onmousemove = function() {
  document.getElementById('footer').setAttribute('class','show');
  clearTimeout(dim);
  dim = setTimeout(hide, 5000);
};
