import React, { FC, useEffect, useState } from "react";
import API from "../../services/api";

interface Props {
  img_id: string;
  vote_id: number;
  vote_value: number;
}

const VoteComponent: FC<Props> = (props: Props) => {
  const [score, setScore] = useState<number>(props.vote_value);
  const [voteId, setVoteId] = useState<number>(props.vote_id);

  const voteUpHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setScore(score + 1);
    const res = await API.setVote(props.img_id, (score + 1));
    setVoteId(res.id);
  };

  const voteDownHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setScore(score - 1);
    const res = await API.setVote(props.img_id, (score - 1));
    setVoteId(res.id);
  };

  return (
    <div>
      <div
        style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px" }}
      >
        <span>Vote score: </span>
        <span>{score}</span>
      </div>
      <button
        onClick={voteUpHandler}
        style={{ width: "50%", borderRadius: "10px", padding: "3px" }}
      >
        Vote up
      </button>
      <button
        onClick={voteDownHandler}
        style={{ width: "50%", borderRadius: "10px", padding: "3px" }}
      >
        Vote down
      </button>
    </div>
  );
};

export default VoteComponent;
