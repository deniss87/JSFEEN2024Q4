export function carRaceAnimation(
    id: number, 
    velocity?: number,
    distance?: number,
): Animation {
    const car = document.getElementById('img__car-' + id.toString()); 
    const finishPosition = (document.getElementById('img__finish').offsetLeft) - 40;
    const animationSpeed = getAnimationSpeed(distance, velocity);

    const raceKeyframes = new KeyframeEffect(
        car,
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${finishPosition}px)` },
        ],
        {
          // keyframe options
          duration: animationSpeed,
          easing: "ease-in-out",
          fill: "both",
        },
    );

    return new Animation(raceKeyframes, document.timeline);
}

export function getAnimationSpeed(distance: number, velocity: number): number {
    const carSpeed = (distance / velocity); 
    return Number(carSpeed.toFixed(2));
}