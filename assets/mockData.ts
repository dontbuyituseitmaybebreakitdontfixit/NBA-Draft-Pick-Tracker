
export const MOCK_CSV_DATA = `Year,Round,OriginalTeam,Status,CurrentOwner,RelatedTeams,Details,StepienRisk
2026,1,ATL,SWAP,,ATL|SAS,SAS has right to swap for ATL. ATL receives better of MIL/NOP.,false
2027,1,ATL,TRADED,SAS,,Traded to SAS (D. Murray). Unprotected.,true
2026,2,ATL,TRADED,BKN,,To BKN via GSW.,false
2027,2,ATL,TRADED,POR,,To POR via BOS/MEM.,false
2028,2,ATL,TRADED,BKN,,To BKN via GSW.,false
2029,2,ATL,TRADED,OKC,,To OKC.,false
2031,2,ATL,SWAP,,ATL|HOU,Swap rights with HOU (Prot 56-60).,false
2026,2,BOS,TRADED,ATL,,To ATL (or MEM/IND/MIA).,false
2027,2,BOS,TRADED,UTA,,To UTA or ORL.,false
2028,1,BOS,SWAP,,BOS|SAS,SAS has right to swap (D. White). Prot 1.,false
2029,1,BOS,TRADED,POR,,To POR (Jrue Holiday).,true
2029,2,BOS,TRADED,OKC,,To OKC.,false
2030,2,BOS,TRADED,BKN,,To BKN via HOU.,false
2031,2,BOS,SWAP,,BOS|UTA|CLE,To UTA (effectively swap).,false
2026,2,BKN,TRADED,MIA,,To MIA (Prot 31-55).,false
2027,1,BKN,SWAP,,BKN|HOU,HOU has right to swap.,false
2028,1,BKN,SWAP,,BKN|PHX,PHX has right to swap (Durant).,false
2029,1,BKN,TRADED,HOU,,To HOU (Durant/Harden). HOU gets best of DAL/PHX/HOU.,true
2028,2,BKN,TRADED,CLE,,To CLE.,false
2026,1,CHA,TRADED,SAS,,Prot 1-14. To SAS (D. Murray trade chain).,false
2026,2,CHA,TRADED,SAC,,To SAC (Prot 56-60) or DET.,false
2027,2,CHA,TRADED,SAC,,To SAC.,false
2026,1,CHI,TRADED,POR,,Incoming from POR (Prot 1-14).,false
2026,2,CHI,TRADED,HOU,,To HOU via WAS.,false
2027,2,CHI,TRADED,WAS,,To WAS.,false
2026,1,CLE,SWAP,,CLE|UTA|MIN,UTA receives best of CLE/MIN/UTA. (Mitchell).,false
2027,1,CLE,TRADED,UTA,,To UTA (Mitchell). Unprotected.,true
2027,2,CLE,TRADED,MIN,,To MIN.,false
2028,1,CLE,SWAP,,CLE|UTA,UTA has right to swap (Mitchell).,false
2029,1,CLE,TRADED,UTA,,To UTA (Mitchell). Unprotected.,true
2029,2,CLE,TRADED,ATL,,To ATL.,false
2030,2,CLE,TRADED,SAS,,To SAS.,false
2027,1,DAL,TRADED,CHA,,To CHA (Prot 1-2) (PJ Washington).,true
2028,1,DAL,SWAP,,DAL|OKC,OKC has right to swap (Gafford/Lively).,false
2028,2,DAL,TRADED,IND,,To IND via SAC.,false
2029,1,DAL,TRADED,HOU,,To HOU/BKN complex. HOU gets best of DAL/PHX.,true
2029,2,DAL,TRADED,BKN,,To BKN (Irving).,false
2030,1,DAL,SWAP,,DAL|SAS,SAS has right to swap (G. Williams).,false
2030,2,DAL,TRADED,BKN,,To BKN.,false
2031,2,DAL,TRADED,DET,,To DET.,false
2026,2,DEN,TRADED,CHA,,To CHA/MIN.,false
2027,1,DEN,TRADED,OKC,,To OKC (Prot 1-5).,true
2027,2,DEN,TRADED,CLE,,To CLE.,false
2028,2,DEN,TRADED,WAS,,To WAS (Prot 31-33).,false
2029,1,DEN,TRADED,OKC,,To OKC (Prot 1-5).,true
2029,2,DEN,TRADED,CHA,,To CHA.,false
2030,2,DEN,TRADED,OKC,,To OKC.,false
2031,2,DEN,TRADED,CHA,,To CHA.,false
2032,1,DEN,TRADED,BKN,,To BKN.,true
2026,2,DET,TRADED,BOS,,To BOS/ORL/NYK.,false
2027,2,DET,TRADED,PHI,,To PHI.,false
2028,2,DET,TRADED,PHI,,To PHI (Prot 31-55).,false
2030,1,GSW,TRADED,WAS,,To WAS (Prot 1-20) (Poole/CP3).,true
2026,2,GSW,TRADED,CHA,,To CHA/MIN.,false
2027,2,GSW,TRADED,PHI,,To PHI/WAS.,false
2028,2,GSW,TRADED,PHI,,To PHI.,false
2029,2,GSW,TRADED,BKN,,To BKN.,false
2031,2,GSW,TRADED,MIN,,To MIN/DET.,false
2032,2,GSW,TRADED,MEM,,To MEM (Prot 31-50).,false
2026,1,HOU,TRADED,OKC,,To OKC (Prot 1-4) (Westbrook/CP3).,true
2026,2,HOU,TRADED,OKC,,To OKC (if 1st conveys).,false
2029,2,HOU,TRADED,WAS,,To WAS.,false
2030,2,HOU,TRADED,OKC,,To OKC.,false
2031,2,HOU,TRADED,BOS,,To BOS (Prot 31-55).,false
2032,2,HOU,TRADED,MIN,,To MIN/PHX.,false
2026,2,IND,TRADED,MEM,,To MEM/BOS/MIA complex.,false
2031,2,IND,SWAP,,IND|WAS,WAS right to swap.,false
2026,1,LAC,TRADED,OKC,,To OKC (PG13). Unprotected.,true
2026,2,LAC,TRADED,BKN,,To BKN/MEM.,false
2027,1,LAC,SWAP,,LAC|OKC,OKC has right to swap (PG13).,false
2027,2,LAC,TRADED,UTA,,To UTA.,false
2028,1,LAC,TRADED,PHI,,To PHI (Harden). Unprotected.,true
2028,2,LAC,TRADED,DET,,To DET/CHA.,false
2029,1,LAC,SWAP,,LAC|PHI,PHI has right to swap (Harden).,false
2029,2,LAC,TRADED,SAS,,To SAS.,false
2030,2,LAC,TRADED,CHA,,To CHA/UTA.,false
2026,2,LAL,TRADED,TOR,,To TOR.,false
2027,1,LAL,TRADED,UTA,,To UTA (Prot 1-4) (Westbrook).,true
2027,2,LAL,TRADED,BKN,,To BKN if 1st conveys.,false
2028,2,LAL,TRADED,ORL,,To ORL/WAS.,false
2029,1,LAL,TRADED,DAL,,To DAL (Kyrie). Unprotected.,true
2029,2,LAL,TRADED,WAS,,To WAS.,false
2030,2,LAL,TRADED,BKN,,To BKN.,false
2031,2,LAL,TRADED,BKN,,To BKN.,false
2026,1,MEM,SWAP,,MEM|PHX|WAS,To CHA? Complex 3-way swap rights.,false
2026,2,MEM,TRADED,POR,,To POR/LAC.,false
2027,2,MEM,TRADED,HOU,,To HOU.,false
2028,2,MEM,TRADED,BKN,,To BKN.,false
2029,2,MEM,TRADED,BKN,,To BKN.,false
2030,1,MEM,SWAP,,MEM|PHX,PHX has right to swap.,false
2030,2,MEM,TRADED,MIN,,To MIN (Prot 31-50).,false
2026,2,MIA,TRADED,BOS,,To BOS/IND/MEM.,false
2027,1,MIA,TRADED,CHA,,To CHA (Prot 1-14) (Rozier).,true
2027,2,MIA,TRADED,OKC,,To OKC/NYK/SAS.,false
2028,2,MIA,TRADED,DET,,To DET.,false
2029,2,MIA,TRADED,OKC,,To OKC.,false
2030,2,MIA,TRADED,OKC,,To OKC.,false
2032,2,MIA,TRADED,BKN,,To BKN.,false
2026,1,MIL,SWAP,,MIL|NOP,NOP has right to swap (Jrue).,false
2026,2,MIL,TRADED,BOS,,To BOS/ORL/NYK.,false
2027,1,MIL,TRADED,NOP,,To NOP (Jrue). Unprotected.,true
2027,2,MIL,TRADED,DET,,To DET.,false
2028,1,MIL,SWAP,,MIL|POR,POR has right to swap (Lillard).,false
2028,2,MIL,TRADED,OKC,,To OKC.,false
2029,1,MIL,TRADED,POR,,To POR (Lillard). Unprotected.,true
2029,2,MIL,TRADED,DET,,To DET/SAC.,false
2030,1,MIL,SWAP,,MIL|POR,POR has right to swap (Lillard).,false
2030,2,MIL,TRADED,ORL,,To ORL.,false
2031,2,MIL,TRADED,CHA,,To CHA.,false
2032,2,MIL,TRADED,CHA,,To CHA.,false
2026,1,MIN,SWAP,,MIN|UTA,UTA has right to swap (Gobert).,false
2026,2,MIN,TRADED,BOS,,To BOS/NYK/WAS.,false
2027,1,MIN,TRADED,UTA,,To UTA (Gobert). Unprotected.,true
2027,2,MIN,TRADED,POR,,To POR.,false
2028,2,MIN,TRADED,SAS,,To SAS.,false
2029,1,MIN,TRADED,UTA,,To UTA (Gobert). Prot 1-5.,true
2030,1,MIN,SWAP,,MIN|SAS,SAS has right to swap (Dillingham).,false
2030,2,MIN,TRADED,DET,,To DET.,false
2031,1,MIN,TRADED,SAC,,To SAC (via SAS Dillingham).,true
2031,2,MIN,SWAP,,MIN|GSW,To DET (Swap GSW).,false
2026,1,NOP,SWAP,,NOP|MIL,Right to swap with MIL.,false
2026,2,NOP,TRADED,WAS,,To WAS/SAS.,false
2027,1,NOP,TRADED,,To ATL (if MIL pick conveyed to NOP).,false
2028,2,NOP,TRADED,SAS,,To SAS.,false
2029,2,NOP,TRADED,SAS,,To SAS.,false
2030,2,NOP,SWAP,,NOP|ORL,ORL right to swap.,false
2031,2,NOP,TRADED,OKC,,To OKC.,false
2026,1,NYK,TRADED,BKN,,Incoming from WAS (Prot 1-8).,false
2026,2,NYK,TRADED,BOS,,To BOS/WAS.,false
2027,1,NYK,TRADED,BKN,,To BKN (Bridges). Unprotected.,true
2027,2,NYK,TRADED,OKC,,To OKC.,false
2028,1,NYK,SWAP,,NYK|BKN,BKN right to swap (Bridges).,false
2028,2,NYK,TRADED,DET,,To DET.,false
2029,1,NYK,TRADED,BKN,,To BKN (Bridges). Unprotected.,true
2029,2,NYK,TRADED,DET,,To DET/SAC.,false
2030,2,NYK,TRADED,POR,,To POR.,false
2031,1,NYK,TRADED,BKN,,To BKN (Bridges). Unprotected.,true
2031,2,NYK,TRADED,CHA,,To CHA (KAT).,false
2026,1,OKC,TRADED,WAS,,To WAS (Swap, least favorable).,false
2026,1,OKC,TRADED,,Incoming HOU (Prot 1-4), LAC (Unprot).,false
2027,1,OKC,TRADED,,Incoming DEN (Prot 1-5), LAC (Swap).,false
2028,1,OKC,TRADED,,Incoming DAL (Swap).,false
2029,1,OKC,TRADED,,Incoming DEN (Prot 1-5).,false
2026,1,ORL,TRADED,MEM,,To MEM/CHA (Swap).,false
2026,2,ORL,TRADED,BOS,,To BOS/NYK.,false
2027,2,ORL,SWAP,,ORL|BOS,To UTA (via BOS swap).,false
2028,1,ORL,TRADED,POR,,To POR.,true
2029,1,ORL,SWAP,,ORL|MEM,MEM right to swap.,false
2030,1,ORL,TRADED,MEM,,To MEM.,true
2030,2,ORL,TRADED,MEM,,To MEM.,false
2026,1,PHI,TRADED,OKC,,To OKC (Prot 1-4).,true
2028,1,PHI,TRADED,BKN,,To BKN (Prot 1-8).,true
2029,1,PHI,SWAP,,PHI|LAC,LAC right to swap.,false
2030,2,PHI,TRADED,DAL,,To DAL.,false
2026,1,PHX,TRADED,WAS,,To WAS (Swap).,false
2026,2,PHX,TRADED,WAS,,To WAS.,false
2027,1,PHX,TRADED,HOU,,To HOU (Durant). Unprotected.,true
2027,2,PHX,TRADED,WAS,,To WAS/PHI.,false
2028,1,PHX,SWAP,,PHX|BKN|WAS,BKN/WAS swap rights (Durant/Beal).,false
2029,1,PHX,TRADED,HOU,,To HOU (Durant). Unprotected.,true
2030,1,PHX,SWAP,,PHX|WAS|MEM,WAS/MEM swap rights.,false
2030,2,PHX,TRADED,WAS,,To WAS/PHI.,false
2031,1,PHX,TRADED,UTA,,To UTA.,true
2031,2,PHX,TRADED,CHA,,To CHA.,false
2032,2,PHX,TRADED,MIN,,To MIN.,false
2026,1,POR,TRADED,CHI,,To CHI (Prot 1-14).,true
2027,2,POR,TRADED,CHA,,To CHA/HOU.,false
2028,1,POR,SWAP,,POR|MIL,Swap with MIL.,false
2029,1,POR,TRADED,WAS,,To WAS.,true
2029,2,POR,TRADED,MEM,,To MEM.,false
2030,1,POR,SWAP,,POR|MIL,Swap with MIL.,false
2030,2,POR,TRADED,WAS,,To WAS/PHI.,false
2026,2,SAC,TRADED,MIL,,To MIL.,false
2027,1,SAC,TRADED,OKC,,To OKC (Prot 1-16) or SAC keeps.,false
2027,2,SAC,TRADED,OKC,,To OKC if 1st kept.,false
2028,2,SAC,TRADED,POR,,To POR.,false
2029,2,SAC,TRADED,HOU,,To HOU.,false
2030,2,SAC,TRADED,SAS,,To SAS.,false
2031,1,SAC,SWAP,,SAC|SAS,SAS right to swap (DeRozan).,false
2031,2,SAC,TRADED,SAS,,To SAS.,false
2026,1,SAS,SWAP,,SAS|ATL,Right to swap with ATL.,false
2027,1,SAS,TRADED,OKC,,To OKC (Prot 1-16) or SAC.,false
2027,2,SAS,TRADED,MIA,,To MIA.,false
2030,1,SAS,SWAP,,SAS|DAL,Right to swap with DAL.,false
2031,1,SAS,SWAP,,SAS|SAC,Right to swap with SAC.,false
2026,2,TOR,TRADED,IND,,To IND (Prot 31-55).,false
2031,2,TOR,TRADED,NOP,,To NOP.,false
2026,1,UTA,TRADED,OKC,,To OKC (Prot 1-8).,true
2026,2,UTA,TRADED,SAS,,To SAS/MIL.,false
2027,2,UTA,TRADED,IND,,To IND.,false
2028,1,UTA,SWAP,,UTA|CLE,Right to swap with CLE.,false
2028,2,UTA,TRADED,OKC,,To OKC.,false
2030,2,UTA,TRADED,CHA,,To CHA.,false
2032,2,UTA,TRADED,WAS,,To WAS.,false
2026,1,WAS,TRADED,NYK,,To NYK (Prot 1-8).,true
2027,2,WAS,TRADED,NYK,,To NYK if 1st not conveyed.,false
2028,2,WAS,TRADED,ORL,,To ORL.,false
2030,2,WAS,TRADED,PHI,,To PHI.,false`
