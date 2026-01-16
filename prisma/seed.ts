import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const refs = [
    // BAMBULAB
    { brand: 'Bambulab', type: 'PLA Basic', colorName: 'Jade White', colorHex: '#F5F5F5' },
    { brand: 'Bambulab', type: 'PLA Basic', colorName: 'Black', colorHex: '#000000' },
    { brand: 'Bambulab', type: 'PLA Basic', colorName: 'Red', colorHex: '#E60012' },
    { brand: 'Bambulab', type: 'PLA Basic', colorName: 'Blue', colorHex: '#0055A4' },
    { brand: 'Bambulab', type: 'PLA Basic', colorName: 'Green', colorHex: '#009944' },
    { brand: 'Bambulab', type: 'PLA Basic', colorName: 'Orange', colorHex: '#F39800' },
    { brand: 'Bambulab', type: 'PLA Matte', colorName: 'Ivory White', colorHex: '#F2E8D5' },
    { brand: 'Bambulab', type: 'PLA Matte', colorName: 'Charcoal', colorHex: '#333333' },
    { brand: 'Bambulab', type: 'PETG Basic', colorName: 'Clear', colorHex: '#FFFFFF' },
    { brand: 'Bambulab', type: 'PETG Basic', colorName: 'Black', colorHex: '#111111' },

    // PRUSAMENT
    { brand: 'Prusament', type: 'PLA', colorName: 'Galaxy Black', colorHex: '#1B1B1B' },
    { brand: 'Prusament', type: 'PLA', colorName: 'Azure Blue', colorHex: '#007FFF' },
    { brand: 'Prusament', type: 'PLA', colorName: 'Lipstick Red', colorHex: '#C41E3A' },
    { brand: 'Prusament', type: 'PLA', colorName: 'Pineapple Yellow', colorHex: '#F5D142' },
    { brand: 'Prusament', type: 'PETG', colorName: 'Prusa Orange', colorHex: '#FF8000' },
    { brand: 'Prusament', type: 'PETG', colorName: 'Jet Black', colorHex: '#000000' },
    { brand: 'Prusament', type: 'ASA', colorName: 'Galaxy Silver', colorHex: '#A9A9A9' },

    // ESUN
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Cold White', colorHex: '#FFFFFF' },
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Black', colorHex: '#0A0A0A' },
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Fire Red', colorHex: '#D21404' },
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Peak Green', colorHex: '#4CAF50' },
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Grey', colorHex: '#808080' },
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Silver', colorHex: '#C0C0C0' },
    { brand: 'eSUN', type: 'PLA Plus', colorName: 'Gold', colorHex: '#D4AF37' },
    { brand: 'eSUN', type: 'PETG', colorName: 'Solid Black', colorHex: '#000000' },

    // ROSA3D
    { brand: 'Rosa3D', type: 'PLA Starter', colorName: 'White', colorHex: '#FFFFFF' },
    { brand: 'Rosa3D', type: 'PLA Starter', colorName: 'Black', colorHex: '#000000' },
    { brand: 'Rosa3D', type: 'PLA Starter', colorName: 'Graphite', colorHex: '#383E42' },
    { brand: 'Rosa3D', type: 'PLA Silk', colorName: 'Silk Turquoise', colorHex: '#40E0D0' },
    { brand: 'Rosa3D', type: 'PLA Silk', colorName: 'Silk Pink', colorHex: '#FFB6C1' },
    { brand: 'Rosa3D', type: 'PLA Silk', colorName: 'Silk Copper', colorHex: '#B87333' },

    // SUNLU
    { brand: 'Sunlu', type: 'PLA', colorName: 'White', colorHex: '#FFFFFF' },
    { brand: 'Sunlu', type: 'PLA', colorName: 'Black', colorHex: '#000000' },
    { brand: 'Sunlu', type: 'PLA Plus', colorName: 'Grey', colorHex: '#7D7D7D' },
    { brand: 'Sunlu', type: 'PLA Silk', colorName: 'Rainbow', colorHex: '#FF00FF' },

    // POLYMAKER
    { brand: 'PolyMaker', type: 'PolyTerra PLA', colorName: 'Cotton White', colorHex: '#EAEAEA' },
    { brand: 'PolyMaker', type: 'PolyTerra PLA', colorName: 'Forest Green', colorHex: '#228B22' },
    { brand: 'PolyMaker', type: 'PolyLite PLA', colorName: 'Teal', colorHex: '#008080' },

    // GENERIC / AUTRES
    { brand: 'Generic', type: 'PLA', colorName: 'Natural', colorHex: '#FFFFF0' },
    { brand: 'Generic', type: 'ABS', colorName: 'Black', colorHex: '#000000' },
    { brand: 'Generic', type: 'ASA', colorName: 'White', colorHex: '#FFFFFF' },
    { brand: 'Generic', type: 'TPU 95A', colorName: 'Red', colorHex: '#FF0000' },
    { brand: 'Generic', type: 'Nylon', colorName: 'Natural', colorHex: '#FFFFFF' }
  ]

  console.log('Nettoyage du catalogue actuel...')
  await prisma.spoolReference.deleteMany({})

  console.log('Injection de ' + refs.length + ' references...')
  for (const r of refs) {
    await prisma.spoolReference.create({ data: r })
  }
  console.log('Catalogue pret !')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })