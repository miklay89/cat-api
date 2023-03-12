import { FC, useEffect, useState, MouseEvent } from "react";
import { Vote } from "../../interfaces/interfaces";
import API from "../../services/api";

interface Props {
  imageId: string;
  votes: Vote[];
}

const VoteComponent: FC<Props> = (props: Props) => {
  const [votes, setVotes] = useState<Vote[] | undefined>(undefined);
  const [voteScore, setVoteScore] = useState<number>();

  useEffect(() => {
    function checkVotes() {
      setVotes(props.votes);
      console.log(props.votes);
      const filteredVotes = props.votes.filter(
        (v) => v.image_id === props.imageId
      );

      const score = filteredVotes
        .map((fv) => fv.value)
        .reduce((acc, next) => acc + next, 0);

      setVoteScore(score);
    }
    if (typeof votes === "undefined") checkVotes();
  }, [props.imageId, props.votes, voteScore, votes]);

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
      <div
        style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px" }}
      >
        <span>Vote score: </span>
        <span>{voteScore}</span>
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
