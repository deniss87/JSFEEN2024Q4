export function carRaceAnimation(
  id: number,
  velocity?: number,
  distance?: number,
): Animation {
  const car = document.getElementById(`img__garage-car-${id.toString()}`);

  let finishPosition = document.getElementById(`garage-race-finish-logo-${id}`).offsetLeft - 10;
  if (finishPosition > 1260) finishPosition = 1260;

  const animationSpeed = getAnimationSpeed(distance, velocity);

  const raceKeyframes = new KeyframeEffect(
    car,
    [
      { transform: 'translateX(0)' },
      { transform: `translateX(${finishPosition}px)` },
    ],
    {
      // keyframe options
      duration: animationSpeed,
      easing: 'ease-in-out',
      fill: 'both',
    },
  );

  return new Animation(raceKeyframes, document.timeline);
}

export function getAnimationSpeed(distance: number, velocity: number): number {
  const carSpeed = distance / velocity;
  return Number(carSpeed.toFixed(2));
}
