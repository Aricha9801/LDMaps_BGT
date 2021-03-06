export const sparqlApi = "https://api.labs.kadaster.nl/datasets/kadaster/bgt/services/bgt/sparql"

export function getDataByQuery(lat: string, long: string, precisie: string){
    return `
prefix bgt: <https://bgt.basisregistraties.overheid.nl/bgt/def/>
prefix bif: <http://www.openlinksw.com/schemas/bif#>
prefix geo: <http://www.opengis.net/ont/geosparql#>
prefix prov: <http://www.w3.org/ns/prov#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

select ?registratie ?type ?shape ?shapeColor ?shapeTooltip {
    bind(strdt(concat('Point(',str(${lat}),' ',str(${long}),')'),geo:wktLiteral) as ?point)
bind(bif:ST_Transform(?point, 28992) as ?pointRd)
    ?registratie
    bgt:geometrie ?rd;
bgt:type ?type.
    ?type rdfs:label ?shapeTooltip.
filter(bif:st_within(?pointRd, ?rd, ${precisie}))
bind(bif:ST_Transform(?rd, 4326) as ?shape)

bind(
if(?type=bgt:Bassin,"#A98BE0",
if(?type=bgt:Bezinkbak,"#968F26",
if(?type=bgt:Damwand,"#D66BCF",
if(?type=bgt:Geluidsscherm,"#964B91",
if(?type=bgt:Gemaal,"#5467BA",
if(?type=bgt:Greppel,"#2BE0D1",
if(?type=bgt:Hek,"#7089FA",
if(?type=bgt:Hoogspanningsmast,"#BDB32F",
if(?type=bgt:Kademuur,"#AB5F30",
if(?type=bgt:Kering,"#7A3248",
if(?type=bgt:LageTrafo,"#BB9AFA",
if(?type=bgt:Muur,"#4CBA71",
if(?type=bgt:Oever,"#5C4C7A",
if(?type=bgt:OpenLoods,"#657CE0",
if(?type=bgt:Opslagtank,"#D6CA35",
if(?type=bgt:Overkapping,"#23BAAE",
if(?type=bgt:Perron,"#D1743B",
if(?type=bgt:Slik,"#37437A",
if(?type=bgt:Sluis,"#5CE088",
if(?type=bgt:Steiger,"#E3D839",
if(?type=bgt:Strekdam,"#177A72",
if(?type=bgt:Stuw,"#EB8242",
if(?type=bgt:Transitie,"#F78A45",
if(?type=bgt:Walbescherming,"#327A4A",
if(?type=bgt:Waterloop,"#8C73BA",
if(?type=bgt:Watervlakte,"#BD5EB6",
if(?type=bgt:Windturbine,"#E05C84",
if(?type=bgt:Zee,"#FA6794","#2FFAEA")))))))))))))))))))))))))))) as ?shapeColor)

}`;
}


//https://api.labs.kadaster.nl/queries/wouter/bgt-lat-long/run?page=1&pageSize=1


