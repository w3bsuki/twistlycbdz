# Archived Components

This directory contains components that were determined to be unused in the active codebase during the April 2024 refactoring. 

Rather than deleting these components immediately, they have been archived here in case they need to be referenced or restored in the future.

## Archived Components List

### Section Components
- **AnimatedListDemo** - Not imported/used in any page
- **FeaturedCollectionsCard** - Only used in SimplifiedHeroCards which is also unused
- **FeaturedProductsCard** - Not imported/used in any page
- **HeroFeatures** - Not imported/used in any page
- **HeroWithCollections** - Not imported/used in any page
- **NavigationGrid** - Not imported/used in any page
- **NewestProductsCard** - Not imported/used in any page
- **SimplifiedHeroCards** - Not imported/used in any page
- **WiderHeroCards** - Not imported/used in any page

### UI Components
- **FeatureCard** - Only referenced in HeroFeatures which is also unused
- **highlighter.tsx** - Not imported/used in any page
- **marquee.tsx** - Not imported/used in any page (testimonials.tsx uses similarly named CSS classes but not this component)
- **spotlight.tsx** - Imported in focus-cards.tsx which is also unused
- **focus-cards.tsx** - Not imported/used in any page

### Feature Components
- **AiChatHero** - Recently edited but not imported/used in any page

## Notes for Restoration

If you need to restore any of these components:
1. Move the component file back to its original location
2. Check for any dependencies that may have also been archived
3. Update any import paths that may have changed during refactoring
4. Test the component to ensure it works properly with the current codebase

## Date of Archival
April 2024 