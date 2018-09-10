import * as React from 'react';
import ProgressCircle from './progress-circle';
import * as styles from './styles.css';

enum Progress {
  MIN = 0,
  MAX = 100,
}

enum Direction {
  INC,
  DEC,
};

interface State {
  progress: number;
  direction: Direction;
};

export default class App extends React.Component<any, State> {
  private timerID: NodeJS.Timer;

  constructor(props: any) {
    super(props);
    this.state = {
      progress: Progress.MIN,
      direction: Direction.INC,
    };
  }

  private tick() {
    this.setState((state) => {
      let { progress, direction } = state;
      if (direction === Direction.INC) {
        progress++;
      } else {
        progress--;
      }

      direction = progress === Progress.MAX ? Direction.DEC
        : progress === Progress.MIN ? Direction.INC : direction;
      return { progress, direction };
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 30);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const pw = 24;
    const cw = pw / 2;
    const tw = pw;

    return (
      <div className={styles.example} >
        <div className={styles.nested} >
          <ProgressCircle className={styles.circle_1}
            fillColor="#000000" trackColor="#330000" progressColor='#ff0000'
            size={250}
            progressWidth={pw}
            trackWidth={tw}
            cornersWidth={cw}
            progress={this.state.progress} />
          <ProgressCircle className={styles.circle_2}
            fillColor="#000000" trackColor="#003300" progressColor='#00ff00'
            size={190}
            progressWidth={pw}
            trackWidth={tw}
            cornersWidth={cw}
            progress={this.state.progress} />
          <ProgressCircle className={styles.circle_3}
           fillColor="#000000" trackColor="#01252d" progressColor='#05bae0'
            size={130}
            progressWidth={pw}
            trackWidth={tw}
            cornersWidth={cw}
            progress={this.state.progress} />
        </div>
      </div>
    );
  }
}