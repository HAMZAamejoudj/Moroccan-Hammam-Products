import type { ProductDetail, ProductSlug } from "../../types";
import { blackSoapEn } from "./black-soap";
import { ghassoulEn } from "./ghassoul";
import { kessaEn } from "./kessa";
import { arganOilEn } from "./argan-oil";
import { floralWatersEn } from "./floral-waters";
import { hammamKitsEn } from "./hammam-kits";

export const productsEn: Record<ProductSlug, ProductDetail> = {
  "moroccan-black-soap": blackSoapEn,
  "ghassoul-clay": ghassoulEn,
  "kessa-exfoliating-gloves": kessaEn,
  "argan-and-prickly-pear-oil": arganOilEn,
  "rose-water-nila-aker-fassi": floralWatersEn,
  "hammam-kits": hammamKitsEn,
};

