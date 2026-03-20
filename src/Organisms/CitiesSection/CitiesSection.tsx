import React, { useState } from 'react'
import { ChevronDown } from '../../Atoms/Icons/ChevronDown'
import { ChevronUp } from '../../Atoms/Icons/ChevronUp'

export interface Region {
  name: string
  cities: string[]
}

export interface CitiesSectionProps {
  title?: string
  regions?: Region[]
}

const DEFAULT_REGIONS: Region[] = [
  {
    name: 'Île-de-France',
    cities: ['Argenteuil', 'Boulogne-Billancourt', 'Champigny-sur-Marne', 'Colombes', 'Courbevoie', 'Créteil', 'Montreuil', 'Noisy-le-Grand', 'Paris', 'Rueil-Malmaison', 'Sartrouville', 'Versailles'],
  },
  {
    name: "Provence-Alpes-Côte d'Azur",
    cities: ['Aubagne', 'Marseille', 'Vitrolles'],
  },
  {
    name: 'Nouvelle-Aquitaine',
    cities: ['Bayonne', 'Bègles', 'Biarritz', 'Bordeaux', 'Dax', 'Pessac'],
  },
  {
    name: 'Occitanie',
    cities: ["Blagnac", 'Colomiers', "L'Isle-Jourdain", 'Montpellier', 'Tarbes', 'Toulouse'],
  },
  {
    name: 'Hauts-de-France',
    cities: ['Lille', 'Roubaix', 'Tourcoing', "Villeneuve-d'Ascq"],
  },
  {
    name: 'Grand Est',
    cities: ['Haguenau', 'Metz', 'Nancy', 'Strasbourg'],
  },
  {
    name: 'Auvergne-Rhône-Alpes',
    cities: ['Lyon', 'Saint-Étienne', 'Villeurbanne'],
  },
  {
    name: 'Pays de la Loire',
    cities: ['Nantes'],
  },
  {
    name: 'Bretagne',
    cities: ['Rennes'],
  },
]

export function CitiesSection({
  title = 'Les villes où nous intervenons en réparation à domicile',
  regions = DEFAULT_REGIONS,
}: CitiesSectionProps) {
  const [open, setOpen] = useState<boolean[]>(() => regions.map(() => false))

  const toggle = (i: number) =>
    setOpen(prev => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <section
      className="w-full px-4 py-10 flex flex-col gap-12"
      style={{ backgroundColor: 'var(--brand-text)' }}
    >
      <h2
        className="text-h3 font-black leading-tight"
        style={{ color: 'var(--pink-500)', letterSpacing: '-0.04em' }}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-6">
        {regions.map((region, i) => (
          <div key={region.name}>
            <button
              className="flex items-center gap-2 text-left"
              onClick={() => toggle(i)}
              aria-expanded={open[i]}
            >
              <span
                className="text-text-main-semibold font-bold"
                style={{ color: 'var(--light-100)' }}
              >
                {region.name}
              </span>
              {open[i] ? (
                <ChevronUp width={20} height={20} style={{ color: 'var(--light-100)', flexShrink: 0 }} />
              ) : (
                <ChevronDown width={20} height={20} style={{ color: 'var(--light-100)', flexShrink: 0 }} />
              )}
            </button>

            {open[i] && (
              <div className="flex flex-col gap-2 mt-3">
                {region.cities.map(city => (
                  <span
                    key={city}
                    className="text-text-small"
                    style={{ color: 'var(--pink-500)' }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
