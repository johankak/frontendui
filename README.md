# Úkol
## Stránka (studijní) skupiny 
- Zobrazení členů, 
- Zobrazení nadřízených skupin 
- Zobrazení vedoucích (rolí) 
- Správa členů 
- Správa rolí 

# Časová posloupnost hlavních commitů

27. 3. 2025 vytvorena_aplikace_knihovna
- vytvoření složky v apps pro naši aplikace
- vytvoření složky knihovny pro komponenty v packages

3. 4. 2025 program page funguje
- zprovoznění zobrazení program page, které jsme použili pro vytvoření group page

5. 4. 2025 vytvoreno Group v moje_knihovna
- vytvoření komponenty Group v moje_knihovna pomocí scriptů

8. 4. 2025 zprovozneno zobrazeni studijni skupiny...
- základní zobrazení stránky studijní skupiny, které jsme následně upravovali

11. 4. 2025 upraveno group large card...
- Johanka vytvořila podobu stránky studijní skupiny

16. 4. 2025 - funguje data generator page
- vytvoření základní stránky pro generování dat, je potřeba přidat tlačítka

22. 4. 2025 - funguje pridavani
- funguje přidávání uživatelů do studijní skupiny pomocí uuid uživatele
- chceme upravit, aby šlo přidávat s pomocí našeptávání při psaní jména

24. 4. 2025 - zprovoznena zakladni user page
- za účelem kontroly jsme zprovoznili zobrazení základní stránky uživatele
- pomocí toho kontrolujeme, zda byl správně přiřazen do skupiny

3. 5. 2025 - uz to funguje, opraven limit kolik membershipu se zobrazi
- byl problém v tom, že se přidaní uživatelé nezobrazovali na stránce studijní skupiny, po hledání jsme našli, že byl defaultně nastaven limit zobrazení membershipů na stránce na 10

11. 5. 2025 - zmena nazvu studijni skupiny funguje
- přidali jsme jednoduchý formulář pro změnu názvu studijní skupiny

14. 5. 2025 - odebrani uzivatele funguje kompletne i s refreshem stranky
- zprovoznili jsme formulář s dropdown menu a tlačítkem, který umožňuje odstranit uživatele ze studijní skupiny

14. 5. 2025 - funguje zobrazeni roli
- funguje zobrazeni rolí přiřazených ke skupině, dalším cílem je zprovoznit možnost upravování rolí


# Definice problémů k vyřešení
- vytvořit základní stránku studijní skupiny a napojit ji na router a backend
- vytvořit dotaz, pomocí kterého budeme zjišťovat data
- dát podobu stránce studijní skupiny
- zjištění nadřazených skupin
- zjištění členů a jejich rolí
- zprovoznit správu členů studijní skupiny

# Co jsme objevili
- musíme se zorientovat ve složce frontendui
- musíme se naučit vytvořit stránku a správně ji napojit na backend
- musíme se naučit vytvářet dotazy pro získávání dat

# Které problémy se nedaří řešit, jak byly vyřešeny
## vytvoření aplikace a knihovny
- vyřešili jsme tím, že jsme zjistili, jak je vytvořeno app_ug a pomocí toho vytvořili moje_aplikace a moje_knihovna

## udělat základní zobrazení stránky studijní skupiny
- zeptali jsme se chatgpt a následně použili tyto znalosti v našem projektu

## vytvoření stránky pro generování dat
- stránku pro generování dat jsme vytvořili na hodině a zkusíme přidávat nová tlačítka

## zprovoznění přidávání uživatelů
- zjistili jsme, že je nutné vytvořit membership pomocí id studijní skupiny a id uživatele
- do stránky jsme to implementovali tak, že id studijní skupiny se načte podle toho, na stránce jaké skupiny se nacházíme. a id uživatele se zadá do formuláře
- - vytvořili jsme MembershipInsertAsyncAction

## zprovoznění odebírání uživatelů
- odebírání uživatelů funguje pomocí odebrání membershipu
- k tomu je nutno znát id membershipu a lastchange
- měli jsme problém se zjištěním lastchange
- tento problém jsme vyřešili s pomocí graphiql tak, že jsme vytvořili správný dotaz
- vytvořili jsme MembershipDeleteAsyncAction

## zprovoznění změny názvu studijní skupiny
- zprovoznění změny názvu nebyl žádný problém, využili jsme GroupUpdateAsyncAction

___________________________________________

TESTOVACI SKUPINA
{
  "__typename": "GroupGQLModel",
  "id": "0d0810f7-b61b-43c2-a746-26800052b7d7",
  "lastchange": "2024-09-08T15:27:11.981546",
  "name": "12-5VK",
  "nameEn": null,
  "mastergroup": {
    "id": "970cb398-6389-42c0-bbd1-872be83e2305",
    "name": "Fakulta vojenské kybernetiky"
  },
  "memberships": [

TESTOVACI UZIVATEL
{
  "__typename": "UserGQLModel",
  "id": "c0f60e42-2a33-4ee2-a3f7-f017e30a0bcf",
  "lastchange": "2025-05-25T06:40:14.414785",
  "name": "Artur",
  "surname": "Ludvík",
  "memberships": [

ADRESY
http://localhost:5173/group/group/view/0d0810f7-b61b-43c2-a746-26800052b7d7
http://localhost:5173/group/readonly/view/0d0810f7-b61b-43c2-a746-26800052b7d7
http://localhost:5173/group/data/random



