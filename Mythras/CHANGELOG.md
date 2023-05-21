# Changelog

All notable changes to the Mythras sheet will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 3.0

v3.0 is a complete re-write of the character sheet from the ground up.  Primary goals of the re-write were simplifying the sheet, fixing performance issues, and making it easier to maintain as future publications are released.  The changes are too numerous to itemize in the Changelog but some key highlights are listed below.  Conversion code should run and ensure all data in maintained but put into the new sheet forms.

### Added
- Support for the Mythic Babylon, Destined, Lyonesse, Fioracitta, and Perceforest settings.
- Dark mode support
- i18n translation for dynamic prompts like those used for sorcery.

### Changes
- Switched to a generic abilities system rather than trying to support all the different magic/power systems throughout various settings and publications.
- Removed and consolidated a lot of inputs fields to reduce sheet complexity and clean up the visual presentation.
- A complete overhaul of the sheet styling, should be no more formatting problems with certain setups.
- Now have a different sheet type for spirits and creatures which are more optimized for NPCs
- Can now switch between Physical, Social, and Spiritual modes to alter the sheet for specific types of conflicts.
- Roll Templates have been updated and now may have buttons to roll followup actions such as rolling hit location or weapon damage, pending on the specific roll made.
- Added a floating options bar at the top to quickly set common changes which will always be in view no matter where in the sheet you are.
- Sheet tabs have been replaced with anchor links so you will jump to that section of the sheet but still have the ability to scroll to other section manually.
- Augmenting and 101+ penalties are now handled as a generic setting rather than per skill.
- Added the ability to select the specific difficult you wish to roll for.
- Weapons can now be favored for inclusion in combat style rolls.
- Added storage location to weapons so they can be moved to various locations or a pack for proper ENC calculation.
- Can now set skill augmentation from a skill and reset it back to zero by clicking a button.
- Now favor changing a skill's total directly and reverse calculating the points added on top of base values.
- Frostbye Books style vehicles no longer have a static module list.  Instead, you may add a module dynamically and define its type to ensure auto calculations are done correctly.  This allows for defining multiple modules of the same type, splitting them into multiple hit locations.
- Cleaned up the translation keys to correct a mis-understanding about their naming patterns.  Attempts have been made to retain translation data as much as possible but some minimal amount of re-translation may be required.
- Updated to support new Roll20 character sheet syntax.
- Added links to Roll20 wiki documentation to various parts of the sheet so user's can quickly find and access relevant documentation and instructions.
- Now has a common hidden hit table button which will indirectly call the right hit table per the sheet type.  This means you can use a hit location macro and target any token and the right table will be used regardless of sheet type.
- Made a number of options part of the setting option to reduce the number of options a GM has to consider.

### Removed
- The Mooks fields which would allow you to track multiple identical characters on a single sheet.  The extra fields were a drain on performance.  Instead, you should use the Conditions notes to mark any changes to individual mooks.

## Previous Versions
This Changelog was not maintained prior to v3.0, so we do not have a record of changes made prior to that release.