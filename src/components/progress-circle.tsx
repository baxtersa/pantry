import * as React from 'react';

export interface Props {
  className?: string;
  size?: number;
  startDegree?: number;
  endDegree?: number;
  progressWidth?: number;
  trackWidth?: number;
  cornersWidth?: number;
  progress?: number;
  fillColor: string;
  trackColor: string;
  progressColor: string;
};

export default class ProgressCircle extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    startDegree: 0,
    progress: 0,
    progressWidth: 5,
    trackWidth: 5,
    cornersWidth: 10,
    size: 200
  };

  private getPoint(r: number, degree: number) {
    const { size } = this.props;
    const d = degree / 180 * Math.PI;

    return {
      x: r * Math.sin(d) + size! / 2,
      y: this.props.trackWidth! / 2 + r * (1 - Math.cos(d))
    };
  }

  render() {
    const {
      progress,
      progressWidth,
      progressColor,
      trackWidth,
      cornersWidth,
      fillColor,
      trackColor,
      startDegree,
      size,
      children,
      ...props
    } = this.props;

    const r = size! / 2 - trackWidth! / 2;
    const endDegree = startDegree! + progress! * 360 / 100;
    const s = this.getPoint(r, startDegree!);
    const e = this.getPoint(r, endDegree!);

    let progressPath = null;
    if (progress! < 50) {
      progressPath = `M ${s.x} ${s.y} A ${r} ${r}, 0, 0, 1, ${e.x},${e.y}`;
    } else {
      const m = this.getPoint(r, startDegree! + 180);
      progressPath = `M ${s.x} ${s.y} A ${r} ${r}, 0, 0, 1, ${m.x},${m.y}
        M ${m.x} ${m.y} A ${r} ${r}, 0, 0, 1, ${e.x},${e.y}`;
    }

    const progressStyle = {
      strokeWidth: progressWidth,
      stroke: progressColor,
      fill: 'none'
    };

    const trackStyle = {
      fill: fillColor,
      stroke: trackColor,
      strokeWidth: trackWidth
    };

    return (
      <svg
        {...props}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle cx={size! / 2} cy={size! / 2} r={r} style={trackStyle} />
        {progress! > 0 ? <path d={progressPath} style={progressStyle} /> : null}
        {progress! > 0 ? (
          <circle cx={s.x} cy={s.y} r={cornersWidth} fill={progressColor} />
        ) : null}
        {progress! > 0 ? (
          <circle cx={e.x} cy={e.y} r={cornersWidth} fill={progressColor} />
        ) : null}
        {children}
      </svg>
    );
  }
};