import "./Statuses.scss";

export function Rework() {
    return (
      <div className="rework-status">
        <span>Rework</span>
      </div>
    );
  }

export function Alternative({ alternativeNumber }: any) {
  return (
    <div className="alternative-status">
      <span>{alternativeNumber} Alternative</span>
    </div>
  );
}

export function Correct() {
    return (
      <div className="correct-status">
        <span>Correct</span>
      </div>
    );
  }


  export function Done() {
    return (
      <div className="correct-status h-m">
        <span>Done</span>
      </div>
    );
  }

  export function Pending() {
    return (
      <div className="alternative-status h-m">
        <span>Pending</span>
      </div>
    );
  }


  export function Status({status}: any) {
    //isPending, isCorrect, isDone, isHasAlternative
    // --pending-status --correct-status --done-status --alt-status

    let content: any;
    if(status === 'pending') {
      content = (<div className="status --pending-status"><span>pending</span></div>)
    }
    else if(status === "correct") {
      content = (<div className="status --correct-status"><span>correct</span></div>)
    }
    else if(status === "done") {
      content = (<div className="status --done-status"><span>done</span></div>)
    }
    else if(status === "rework") {
      content = (<div className="status --rework-status"><span>rework</span></div>)
    }
    else {
      content = (<div className="status --alt-status"><span>{status}</span></div>)
    }
    return (<>
    {content}
    </>)
  }




