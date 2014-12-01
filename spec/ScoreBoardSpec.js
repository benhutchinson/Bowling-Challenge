describe("ScoreBoard", function() {

  beforeEach(function() {
    board = new ScoreBoard();
    frame = new Frame();
    frame2 = new Frame();
    roll1 = new Roll();
    roll2 = new Roll();
    roll3 = new Roll();
    roll4 = new Roll();
  });

  it('should should start out with zero points on the board', function() {
    expect(board.score).toBe(0);
  });

  it('should be able to present the total score for normal frames', function() {
    roll1.attempt(2);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.calculateRunningTotal(frame);
    expect(board.score).toEqual(7);
  });

  it('should recognise if a spare has been achieved', function() {
    expect(board.FrameStatus).toEqual("Normal");
    roll1.attempt(5);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storeFrameStatus(frame);
    expect(board.FrameStatus).toEqual("Spare");
  });

  it('should recognise if a strike has been achieved', function() {
    expect(board.FrameStatus).toEqual("Normal");
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storeFrameStatus(frame);
    expect(board.FrameStatus).toEqual("Strike");
  });

  it('should recognise if a bonus needs to apply to a frame', function() {
    expect(board.shouldABonusApply()).toBe(false);
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storeFrameStatus(frame);
    expect(board.shouldABonusApply()).toBe(true);
  });

  it('should display "X" as the current score if the previous round finished a strike', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storeFrameStatus(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("X");

  });

  it('should display "/" as the current score if the previous round finished a spare', function() {
    roll1.attempt(1);
    frame.storeRoll(roll1);
    roll2.attempt(9);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storeFrameStatus(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("/");
  });

  it('should display the current score if the previous round finished as neither a spare nor a strike', function() {
    roll1.attempt(1);
    frame.storeRoll(roll1);
    roll2.attempt(6);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.calculateRunningTotal(frame);
    board.storeFrameStatus(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual(7);
  });




});