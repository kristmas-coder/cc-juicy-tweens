import { _decorator, Node, Tween, tween, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('JuicyTweens')
export class JuicyTweens {

    public static ShakeRotation(node: Node, angle: number = 5, duration: number = 0.25, delay: number = 0): Tween<Node> {
        const durationStep: number = duration / 5;
        return tween(node).delay(delay)
            .to(durationStep * 2, { angle: angle }, { easing: 'sineOut' })
            .to(durationStep * 2, { angle: -angle }, { easing: 'sineOut' })
            .to(durationStep, { angle: 0 }, { easing: 'sineOut' })
            .start();
    }

    public static ShakeHorisontal(node: Node, strength: number = 5, duration: number = 0.35, originalPosition: Vec3 | null = null, delay: number = 0): Tween<Node> {
        if (originalPosition === null) {
            originalPosition = node.position.clone();
        }

        const durationStep: number = duration / 9;
        return tween(node).delay(delay)
            .to(durationStep, { position: new Vec3(originalPosition.x + strength, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x - strength, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x + strength / 2, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x - strength / 2, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x + strength / 4, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x - strength / 4, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x + strength / 8, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x - strength / 8, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .to(durationStep, { position: new Vec3(originalPosition.x, originalPosition.y, originalPosition.z) }, { easing: 'quadInOut' })
            .start();
    }

    public static ZoomInOut(node: Node, power: number = 1.2, duration: number = 0.3, delay: number = 0): Tween<Node> {
        const durationStep: number = duration / 3;
        return tween(node).delay(delay)
            .to(durationStep * 2, { scale: new Vec3(power, power, power) }, { easing: 'bounceOut' })
            .to(durationStep, { scale: new Vec3(1, 1, 1) }, { easing: 'bounceOut' })
            .start();
    }

    public static Fly(node: Node, targetPos: Vec3, duration: number = 0.2, delay: number = 0, destroyOnComplete: boolean = true): Tween<Node> {
        tween(node).delay(delay).to(duration, { worldPosition: targetPos }, { easing: 'sineOut' }).start(); // tween X separetly from Y
        return tween(node).delay(delay).to(duration, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' }).call(()=>{
            if (destroyOnComplete){
                node.destroy();
            }
        }).start();
    }

    public static Spread(node: Node, spread: number, duration: number = 0.2, delay: number = 0): Tween<Node> {
        const newPosition = node.position.clone();
        newPosition.x += (1 - Math.random() * 2) * spread;
        newPosition.y += (1 - Math.random() * 2) * spread;
        return tween(node).delay(delay).to(duration, { position: newPosition }, { easing: 'sineOut' }).start();
    }

}

