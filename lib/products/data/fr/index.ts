import type { ProductDetail, ProductSlug } from "../../types";
import { blackSoapFr } from "./black-soap";
import { ghassoulFr } from "./ghassoul";
import { kessaFr } from "./kessa";
import { arganOilFr } from "./argan-oil";
import { floralWatersFr } from "./floral-waters";
import { hammamKitsFr } from "./hammam-kits";

export const productsFr: Record<ProductSlug, ProductDetail> = {
  "moroccan-black-soap": blackSoapFr,
  "ghassoul-clay": ghassoulFr,
  "kessa-exfoliating-gloves": kessaFr,
  "argan-and-prickly-pear-oil": arganOilFr,
  "rose-water-nila-aker-fassi": floralWatersFr,
  "hammam-kits": hammamKitsFr,
};

