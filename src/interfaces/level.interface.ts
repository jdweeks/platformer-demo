import { Image } from "./image.interface";

export interface Level {
    platforms: Array<Image>,
    decoration: Array<Image>,
    spiders: Array<Image>,
    coins: Array<Image>,
    hero: Image,
    door: Image,
    key: Image
}