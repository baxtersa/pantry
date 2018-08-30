import * as React from 'react';
import ProgressCircle from './progress-circle';
import * as styles from './styles.css';

export default class App extends React.Component {
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
            progress={40} />
          <ProgressCircle className={styles.circle_2}
            fillColor="#000000" trackColor="#003300" progressColor='#00ff00'
            size={190}
            progressWidth={pw}
            trackWidth={tw}
            cornersWidth={cw}
            progress={50} />
          <ProgressCircle className={styles.circle_3}
           fillColor="#000000" trackColor="#01252d" progressColor='#05bae0'
            size={130}
            progressWidth={pw}
            trackWidth={tw}
            cornersWidth={cw}
            progress={80} />
        </div>
      </div>
    );
  }
}