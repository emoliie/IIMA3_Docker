# 🎨 Guide de Design - Mood Tracker Frontend

## 🎯 Vision Générale

L'application Mood Tracker est conçue avec :
- **Accessibilité** : Facile à utiliser pour tous
- **Responsivité** : Fonctionne sur tous les appareils
- **Modernité** : Design actuel et attrayant
- **Clarté** : Interface intuitive et claire

## 🌈 Palette de Couleurs

### Couleurs Primaires
```
Violet Principal : #667eea
Pourpre Accent  : #764ba2
Dégradé : linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Couleurs Secondaires
```
Blanc            : #ffffff
Gris Clair       : #f5f5f5, #f9f9f9, #f0f4ff
Gris Moyen       : #999999
Gris Foncé       : #666666
Noir Texte       : #333333
```

### Couleurs d'État
```
Succès  : #d4edda (fond) + #155724 (texte)
Erreur  : #f8d7da (fond) + #721c24 (texte)
Alerte  : #fff3cd (fond) + #856404 (texte)
Info    : #d1ecf1 (fond) + #0c5460 (texte)
```

## 🎯 Dégradés

```css
/* Principal */
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Secondaire */
linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
```

## 📐 Typographie

### Police
```
Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
```

### Tailles et Poids
```
Titre Principal (h1)  : 2.5rem, font-weight: 700
Titre Page (h2)       : 1.5rem, font-weight: 600
Titre Section (h3)    : 1.2rem, font-weight: 600
Texte Normal          : 1rem, font-weight: 400
Texte Petit           : 0.9rem, font-weight: 400
Label/Forte           : 1rem, font-weight: 600
```

## 🎛️ Composants

### Boutons

#### Bouton de Navigation (Inactif)
```css
padding: 0.75rem 1.5rem
border: 2px solid #e0e0e0
background: white
color: #667eea
border-radius: 8px
font-weight: 600
transition: all 0.3s ease
```

#### Bouton de Navigation (Actif)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
color: white
border-color: transparent
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4)
```

#### Bouton de Sélection d'Humeur
```css
padding: 1.5rem 1rem
background: #f5f5f5
border: 2px solid transparent
border-radius: 12px
transition: all 0.3s ease
font-size: 2.5rem emoji
```

Hover :
```css
background: #f0f4ff
border-color: #667eea
transform: translateY(-2px)
box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2)
```

Selected :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
color: white
border-color: #667eea
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4)
```

### Cartes (Cards)

```css
background: white
border-radius: 12px
padding: 2rem
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)
max-width: 600px (ou 800px, 1000px selon contexte)
```

### Champs de Texte

```css
border: 2px solid #e0e0e0
border-radius: 8px
padding: 1rem
font-family: inherit
transition: border-color 0.3s ease
```

Focus :
```css
outline: none
border-color: #667eea
box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1)
```

## 📱 Responsive Design

### Breakpoints
```css
Mobile  : < 480px
Tablet  : 480px - 768px
Desktop : > 768px
```

### Grilles

#### Mood Buttons
- Desktop (> 480px) : 4 colonnes
- Mobile (< 480px)  : 2 colonnes

#### Recent Entries
- Desktop : auto-fill, minmax(100px, 1fr)
- Mobile  : 3 colonnes (480px max)

### Padding/Margin
```
Desktop : 2rem
Tablet  : 1.5rem
Mobile  : 1rem
```

## 🎬 Animations et Transitions

### Transitions Globales
```css
transition: all 0.3s ease
transition: border-color 0.3s ease
transition: transform 0.2s ease
transition: width 0.3s ease
```

### Transformations
```css
/* Hover effects */
transform: translateY(-2px)
transform: scale(1.2)
transform: translateX(4px)
```

### Durations
```
Rapide   : 0.2s
Normal   : 0.3s
Lent     : 0.5s
```

## 📊 Graphiques

### Barres de Progression
```css
height: 24px
background: #e0e0e0
border-radius: 12px
overflow: hidden
```

Remplissage :
```css
background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)
border-radius: 12px
transition: width 0.3s ease
```

## ✨ Effets Visuels

### Ombres
```css
Légère : box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
Normale : box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)
Forte : box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4)
```

### Bordures
```css
Border Radius : 8px (boutons, champs)
             : 12px (cartes)
```

### Dégradés de Texte
Titre : Couleur unie (#333)
Emoji : Font-size suffisant (2.5rem pour boutons)

## 🎯 États de Composants

### Entrée d'Humeur
- **Vide** : Boutons non sélectionnés
- **Sélectionnée** : Dégradé violet
- **Chargement** : Bouton désactivé, opacité 0.7
- **Succès** : Fond vert clair
- **Erreur** : Fond rouge clair

### Historique
- **Vide** : Message centré
- **Chargement** : Spinner/texte "Chargement..."
- **Erreur** : Message rouge
- **Normal** : Liste d'entrées

### Statistiques
- **Vide** : "Aucune donnée"
- **Chargement** : Spinner
- **Erreur** : Message rouge
- **Graphiques** : Barres animées

## 📐 Espacements

### Padding
```
Petit   : 0.5rem
Normal  : 1rem
Grand   : 1.5rem
Très Grand : 2rem
```

### Margin
```
Entre éléments : 1rem
Entre sections : 2rem
Entre cartes   : 1.5rem
```

### Gaps (Flex/Grid)
```
Petite gap  : 0.5rem
Normale gap : 1rem
Grande gap  : 1.5rem
Très grande : 2rem
```

## 🔤 Icônes et Emojis

### Emojis Humeurs
```
😄 excellent
🙂 good
😐 neutral
😔 bad
```

### Emojis Interface
```
😊 Titre principal
📝 Aujourd'hui
📋 Historique
📊 Statistiques
✅ Succès
❌ Erreur
📭 Vide
🗑️ Supprimer
```

## ♿ Accessibilité

### Contrastes
- Tous les textes respectent WCAG AAA (ratio 7:1)
- Couleurs pas utilisées seules pour la signification

### Focus States
- Tous les boutons ont un focus visible
- Outline ou box-shadow visible

### Alt Text
- Emojis ont des title="" pour accessibilité

### Sémantique
- Utilisation correcte des balises HTML (h1, h2, label, button, etc.)

## 📱 Exemple Responsive

```
Desktop (1200px)         Tablet (768px)        Mobile (375px)
┌──────────────────┐   ┌────────────────┐   ┌──────────────┐
│ MOOD TRACKER     │   │ MOOD TRACKER   │   │ MOOD TRACKER │
└──────────────────┘   └────────────────┘   └──────────────┘
┌──────────────────┐   ┌────────────────┐   ┌──────────────┐
│📝│📋│📊           │   │📝│📋│📊        │   │📝  📋  📊   │
└──────────────────┘   └────────────────┘   └──────────────┘
┌──────────────────┐   ┌────────────────┐   ┌──────────────┐
│  4 mood buttons  │   │ 4 mood buttons │   │ 2 mood btn   │
│  (grid 4 cols)   │   │ (grid 4 cols)  │   │ (grid 2 cols)│
│  Full width form │   │ Full width form│   │ Stacked form │
└──────────────────┘   └────────────────┘   └──────────────┘
```

## 🎨 Couleurs par Contexte

### Header
- Dégradé violet (#667eea → #764ba2)
- Texte blanc

### Navigation
- Fond blanc/transparent
- Couleur violet (#667eea)
- Bouton actif avec dégradé

### Contenu Principal
- Fond blanc des cards
- Texte gris foncé (#333)
- Accents violets

### Messages
- Succès : Vert (#155724, #d4edda)
- Erreur : Rouge (#721c24, #f8d7da)

## 🔄 Cohérence

Tous les boutons similaires ont le même style
Toutes les cartes ont la même ombre
Tous les inputs ont les mêmes transitions
Toutes les listes ont le même espacement

Cette cohérence crée une expérience utilisateur fluide et professionnelle.
