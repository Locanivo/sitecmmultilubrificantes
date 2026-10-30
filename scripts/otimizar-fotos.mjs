/**
 * Gera as fotos do site (public/img/*.webp) a partir dos originais em
 * fotos-originais/, que nunca são alterados.
 *
 * Tratamento leve e realista: corrige orientação, converte para sRGB,
 * +3% de contraste em torno do cinza médio e nitidez fina (unsharp mask
 * suave). Sem ampliar, sem recortar, sem mudar cores. O Next.js gera as
 * variantes AVIF/WebP em cada largura a partir destes arquivos.
 *
 * Uso: node scripts/otimizar-fotos.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const photos = {
  "cm-multi-oficina": "61aabab6-94ce-4364-8553-e8ba12f2356b.png",
  "cm-multi-lubrificantes-prateleira": "58d60911-eb34-4410-8bd1-aec841941f14.png",
  "cm-multi-manutencao": "9c2014b4-9807-40fb-851c-3305b1d866e4.png",
  "cm-multi-equipe": "3e474a6b-1d45-484f-9509-ceb83b081a39.png",
  "cm-multi-fachada": "dbdee920-5dbd-4ab8-847e-db07aa59b723.png",
};

const contrast = 1.03;

await mkdir("public/img", { recursive: true });

for (const [name, file] of Object.entries(photos)) {
  const input = `fotos-originais/${file}`;
  const output = `public/img/${name}.webp`;
  const info = await sharp(input)
    .rotate()
    .toColourspace("srgb")
    .linear(contrast, -128 * (contrast - 1))
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.5 })
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(output);
  const before = (await stat(input)).size;
  console.log(`${name}.webp  ${info.width}x${info.height}  ${(before / 1024).toFixed(0)} KB -> ${(info.size / 1024).toFixed(0)} KB`);
}
