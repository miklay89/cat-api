import { FC, useEffect, useState, MouseEvent } from "react";
import { Vote } from "../../../interfaces/interfaces";
import API from "../../../services/api";
import "./style.css";

interface Props {
  imageId: string;
  votes: Vote[];
}

const VoteComponent: FC<Props> = (props: Props) => {
  const [votes, setVotes] = useState<Vote[]>(props.votes);
  
  const score = votes
    .filter((v) => v.image_id === props.imageId)
    .map((d) => d.value)
    .reduce((acc, next) => acc + next, 0);
  const [voteScore, setVoteScore] = useState<number>(score);

  const voteUpHandler = async (e: MouseEvent) => {
    e.preventDefault();
    setVoteScore(voteScore! + 1);
    await API.setVote(props.imageId, voteScore! + 1);
  };

  const voteDownHandler = async (e: MouseEvent) => {
    e.preventDefault();
    setVoteScore(voteScore! - 1);
    await API.setVote(props.imageId, voteScore! - 1);
  };

  return (
    <div>
      <div className="score">
        <span>Vote score: </span>
        <span>{voteScore}</span>
      </div>
      <button onClick={voteUpHandler} className="vote_btn">
        Vote up
      </button>
      <button onClick={voteDownHandler} className="vote_btn">
        Vote down
      </button>
    </div>
  );
};

export default VoteComponent;
