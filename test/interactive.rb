path = 'http://learn-kana.org/'

describe 'LearnKana' do
  before (:each) do
    browser.goto path
    @quiz = browser.div('id', 'quiz')
    @preferences = browser.div('id', 'preferences')
    @meta = browser.div('id', 'meta')
    @input = browser.text_field('id', 'input')
    @result = browser.span('id', 'result')
    @about = browser.p('id', 'about')
    @prefs = browser.p('id', 'prefs')
  end

  describe 'Quiz' do
    it 'is visible and #preferences and #meta are hidden' do
      @quiz.should be_visible
      @preferences.should_not be_visible
      @meta.should_not be_visible
    end

    it 'only accepts 15 romanji characters' do
      @input.set '123456789012345FAIL'
      @input.value.should == '123456789012345'
    end

    it 'returns “Wrong!” when entering an incorrect answer' do
      @input.set 'Wrong answer'
      browser.keys.send :enter
      @result.text.should include 'Wrong!'
    end
  end

  describe 'About' do
    it 'opens when clicking “About”' do
      @about.click
      @quiz.should_not be_visible
      @preferences.should_not be_visible
      @meta.should be_visible
    end
  end

  describe 'Preferences' do
    it 'opens when clicking “Choose characters”' do
      @prefs.click
      @quiz.should_not be_visible
      @preferences.should be_visible
      @meta.should_not be_visible
    end
  end

end
