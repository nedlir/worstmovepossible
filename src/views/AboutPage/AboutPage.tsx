import React from "react";
import "./AboutPage.css";

const AboutPage: React.FC = () => (
  <div className="content-container">
    <h1 className="page-title">
      Why THE %$#! WOULD YOU BUILD SOMETHING LIKE THAT????
    </h1>

    <div className="content-section">
      <p className="hook-text">
        If you ask a chess player what the worst move in any position is, the
        correct answer would be "resigning", which is technically correct, but
        kind of a boring answer.
      </p>
      <p className="hook-text">
        This project started off as a dumb idea: what if we trained people to
        spot the <em>worst</em> move instead of the best one? Somewhere along
        the way, it stopped being a joke (sort of), and I realized there might
        be some value in it.
      </p>
      <p className="hook-text">
        <strong>WorstMovePossible is aimed at learning from disasters.</strong>
      </p>
      <p className="hook-text">
        Not sure if it’ll make you better at chess, but it might help you avoid
        some embarrassing losses or punish them when your opponent does
        something dumb.
      </p>
    </div>

    <div className="challenge-text">
      <p>
        Improving at chess isn't just about finding good moves. Sometimes it's
        about recognizing when something just looks... wrong.
      </p>
    </div>

    <div className="features-paragraph">
      <h3>Why bother?</h3>
      <p>
        Honestly, this is less about deep theory and more about building some
        practical pattern recognition. You see enough awful moves, and you start
        to develop a sense for what <em>not</em> to do, and what to look for
        when your opponent slips up.
      </p>
      <p>
        For a while, I realized I was struggling with defense simply because I
        was way too focused on attacking. I’d tunnel vision on threats and
        flashy tactics, and completely miss the slow disasters building on my
        side of the board. Working on this project was partly a way to force
        myself to pay attention to the other half of the game.
      </p>
      <p>
        This might help your tactics. Might help your general awareness. Might
        just be entertaining in a chaotic kind of way. No guarantees, but I
        believe it's more fun than memorizing 20 moves of the Najdorf.
      </p>
      <p>
        If you're the kind of player who occasionally drops a queen or misses a
        mate in one, and let’s be honest, we all do (the pros just do it
        less...), this might be a decent way to get a little sharper without
        grinding opening lines.
      </p>

      <h3>How do the puzzles work?</h3>
      <p>
        The starting positions were scraped together using{" "}
        <a href="https://database.lichess.org/">lichess open database</a> and
        evaluated with <a href="https://stockfishchess.org">Stockfish</a>{" "}
        engine. It runs a{" "}
        <a href="https://en.wikipedia.org/wiki/Minimax">minimax algorithm</a>{" "}
        behind the scenes, except instead of looking for the best move, I
        tweaked the results to focus on the worst move possible - given there is
        a single move like that or that this move is far more catastrophic
        ranking-wise than the other moves below it.
      </p>
      <p>
        If you want to poke around, the code’s on{" "}
        <a href="https://github.com/nedlir">my GitHub</a>.
      </p>
    </div>
  </div>
);

export default AboutPage;
