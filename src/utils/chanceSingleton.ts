import _Chance from "chance";

class Chance extends _Chance {
  private static instance: Chance;

  private constructor() {
    super();
  }

  public static getInstance(): Chance {
    if (!Chance.instance) {
      Chance.instance = new Chance();
    }

    return Chance.instance;
  }
}

export const chance = Chance.getInstance();
