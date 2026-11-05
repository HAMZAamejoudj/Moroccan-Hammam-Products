import type { ProductDetail, ProductSlug } from "../../types";
import { blackSoapAr } from "./black-soap";
import { ghassoulAr } from "./ghassoul";
import { kessaAr } from "./kessa";
import { arganOilAr } from "./argan-oil";
import { floralWatersAr } from "./floral-waters";
import { hammamKitsAr } from "./hammam-kits";

export const productsAr: Record<ProductSlug, ProductDetail> = {
  "moroccan-black-soap": blackSoapAr,
  "ghassoul-clay": ghassoulAr,
  "kessa-exfoliating-gloves": kessaAr,
  "argan-and-prickly-pear-oil": arganOilAr,
  "rose-water-nila-aker-fassi": floralWatersAr,
  "hammam-kits": hammamKitsAr,
};

