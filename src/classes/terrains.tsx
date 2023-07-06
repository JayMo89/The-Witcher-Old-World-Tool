import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";

import { ReadonlyDeck } from "./dataClasses";

type TerrainType = "Mountain" | "Forest" | "Water" | "Any";
type TerrainTokenType = [string, number, TerrainType];

interface TerrainToken {
    readonly name: string;
    readonly number: number;
    readonly type: TerrainType;
    readonly imgStr: string;
}

abstract class TerrainTokenClass {
    readonly name: string = "DefaultTokenName";
    readonly imgStr: string = "";
    img(): React.ReactNode {
        return (
            <Container id='TokenContainer' className='px-4 py-2 m-2'>
                <Row className="justify-content-center">
                    <Col xs='auto'>
                        <Image
                            id={`${this.name}IconImage`}
                            src={require(`../img/tokens/reducedTerrainTokens/${this.imgStr}.png`)}
                            width={150}
                            alt={this.name}
                            loading='lazy'
                            roundedCircle
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

class MountainToken extends TerrainTokenClass implements TerrainToken {
    readonly name: string;
    readonly number: number;
    readonly type: TerrainType;
    readonly imgStr: string;

    constructor(number = -1, name = "DefaultMountainToken", img = "MountainBack") {
        super();
        this.name = name;
        this.number = number;
        this.type = "Mountain";
        this.imgStr = img;
    }
}

class ForestToken extends TerrainTokenClass implements TerrainToken {
    readonly name: string;
    readonly number: number;
    readonly type: TerrainType;
    readonly imgStr: string;

    constructor(number = -1, name = "DefaultForestToken", img = "ForestBack") {
        super();
        this.name = name;
        this.number = number;
        this.type = "Forest";
        this.imgStr = img;
    }
}

class WaterToken extends TerrainTokenClass implements TerrainToken {
    readonly name: string;
    readonly number: number;
    readonly type: TerrainType;
    readonly imgStr: string;

    constructor(number = -1, name = "DefaultWaterToken", img = "WaterBack") {
        super();
        this.name = name;
        this.number = number;
        this.type = "Water";
        this.imgStr = img;
    }
}

const MountainTokens: Array<MountainToken> = [
    new MountainToken(2, "Hengfors", "Mountain2Hengfors"),
    new MountainToken(3, "Kaer Morhen", "Mountain3KaerMorhen"),
    new MountainToken(9, "Cintra", "Mountain9Cintra"),
    new MountainToken(11, "Beauclair", "Mountain11Beauclair"),
    new MountainToken(13, "Doldeth", "Mountain13Doldeth"),
    new MountainToken(18, "Ard Modron", "Mountain18ArdModron"),
];

const ForestTokens: Array<ForestToken> = [
    new ForestToken(6, "Novigrad", "Forest6Novigrad"),
    new ForestToken(7, "Vizima", "Forest7Vizima"),
    new ForestToken(8, "Vengerberg", "Forest8Vengerberg"),
    new ForestToken(10, "Haern Caduch", "Forest10HaernCaduch"),
    new ForestToken(16, "Dhuwod", "Forest16Dhuwod"),
    new ForestToken(17, "Stygga", "Forest17Stygga"),
];

const WaterTokens: Array<WaterToken> = [
    new WaterToken(1, "Kaer Seren", "Water1KaerSeren"),
    new WaterToken(4, "Ban Ard", "Water4BanArd"),
    new WaterToken(5, "Cidaris", "Water5Cidaris"),
    new WaterToken(12, "Glenmore", "Water12Glenmore"),
    new WaterToken(14, "Loc Ichaer", "Water14LocIchaer"),
    new WaterToken(15, "Gorthur Guaed", "Water15GorthurGuaed"),
];

export default class TerrainTokenDeck {
    mountainDeck: ReadonlyDeck<MountainToken>;
    forestDeck: ReadonlyDeck<ForestToken>;
    waterDeck: ReadonlyDeck<WaterToken>;
    allDeck: ReadonlyDeck<TerrainToken>;

    constructor() {
        this.mountainDeck = new ReadonlyDeck<MountainToken>(MountainTokens);
        this.forestDeck = new ReadonlyDeck<ForestToken>(ForestTokens);
        this.waterDeck = new ReadonlyDeck<WaterToken>(WaterTokens);
        this.allDeck = new ReadonlyDeck<MountainToken | ForestToken | WaterToken>(
            [...MountainTokens, ...ForestTokens, ...WaterTokens]
        );
    }

    drawMountainToken(): MountainToken {
        try {
            return this.mountainDeck.draw();
        } catch (error) {
            this.mountainDeck.repopulate();
        }
        return this.mountainDeck.draw();
    }
    drawForestToken(): ForestToken {
        try {
            return this.forestDeck.draw();
        } catch (error) {
            this.forestDeck.repopulate();
        }
        return this.forestDeck.draw();
    }
    drawWaterToken(): WaterToken {
        try {
            return this.waterDeck.draw();
        } catch (error) {
            this.waterDeck.repopulate();
        }
        return this.waterDeck.draw();
    }

    addTokenBackToDeck(token: MountainToken | ForestToken | WaterToken) {
        if (token.type === "Mountain" && token instanceof MountainToken) {
            this.mountainDeck.returnItem(token);
        } else if (token.type === "Forest" && token instanceof ForestToken) {
            this.forestDeck.returnItem(token);
        } else if (token.type === "Water" && token instanceof WaterToken) {
            this.waterDeck.returnItem(token);
        } else {
            throw new Error(
                `TerrainToken ${token}'s type ${token.type} is not a valid match.` +
                `Can only add "Mountain", "Forest", and "Water".`
            );
        }
    }

    refillDeck(type: TerrainType): void {
        if (type === "Mountain") {
            this.mountainDeck.repopulate();
        } else if (type === "Forest") {
            this.forestDeck.repopulate();
        } else if (type === "Water") {
            this.waterDeck.repopulate();
        } else {
            throw new Error(`TerrainType ${type} is not a valid match. Can only add "Mountain", "Forest", and "Water".`);
        }
    }

    refillAllDecks(): void {
        this.refillDeck("Mountain");
        this.refillDeck("Forest");
        this.refillDeck("Water");
    }
}

export {
    TerrainType,
    TerrainTokenType,
    MountainToken,
    ForestToken,
    WaterToken,
    MountainTokens,
    ForestTokens,
    WaterTokens,
    TerrainTokenDeck
};
