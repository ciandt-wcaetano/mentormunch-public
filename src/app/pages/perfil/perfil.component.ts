import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MentoriaStudentDetailsComponent } from '@app/shared/components/mentoria-student-details/mentoria-student-details.component';
import { TokenHelper } from '@app/shared/helpers/token.helper';
import { AlunoData, AvaliacaoData, MentoriaData, MentoriasPerfilData, ProfessorData } from '@core/interfaces/models';
import { AlunoService } from '@core/services/aluno.service';
import { ProfessorService } from '@core/services/professor.service';
import { SessionService } from '@core/services/session.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  elementDataAvaliacao: any = [];
  elementDataMentoriasPerfil: MentoriasPerfilData[] = [];
  perfilData: AlunoData | ProfessorData;
  userLogger: 'professor' | 'aluno';
  dataSourceMentorias: MatTableDataSource<MentoriasPerfilData> = new MatTableDataSource(this.elementDataMentoriasPerfil);
  displayedColumnsMentorias: string[] = ['professor', 'skill', 'nivel', "n de sessoes"];
  dataSourceSkills: MatTableDataSource<AvaliacaoData | string> = new MatTableDataSource(this.elementDataAvaliacao);
  displayedColumnsSkills: string[];

  constructor(private dialog: MatDialog, private alunoService: AlunoService, private sessionService: SessionService, private professorService: ProfessorService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    let user = null;
    let token = this.sessionService.getAccessToken();
    if (this.activatedRoute.snapshot.queryParams['id'] && this.activatedRoute.snapshot.queryParams['perfil']) {
      user = {
        id: this.activatedRoute.snapshot.queryParams['id'],
        perfil: this.activatedRoute.snapshot.queryParams['perfil']
      }
    } else {
      let userString = await this.sessionService.getUserData();
      user = TokenHelper.parseUserData(userString);
    }
    if (user.perfil === 'aluno') {
      this.userLogger = 'aluno';
      this.perfilData = (await this.alunoService.getAlunoById(user.id, token).toPromise()).body;
      this.elementDataAvaliacao = this.perfilData.talentos.map((talento) => {
        return {
          skill: talento.nome,
          avaliacao: talento.avaliacao.toString()
        };
      });
      this.displayedColumnsSkills = ['skill', 'avaliacao'];

      let mentoriaData: MentoriaData[] = (await this.alunoService.getMentoriasFromAlunosById(user.id, token).toPromise()).body;
      this.elementDataMentoriasPerfil = mentoriaData.map((mentoria) => {
        return {
          ...mentoria,
          skill: mentoria.mentoria,
          nivel: this.elementDataAvaliacao.find((avaliacao) => avaliacao.skill === mentoria.mentoria).avaliacao,
          "n de sessoes": mentoria.sessoes.length.toString()
        };
      });

      
    } else if (user.perfil === 'professor') {
      this.userLogger = 'professor';
      this.perfilData = (await this.professorService.getProfessorById(user.id, token).toPromise()).body;

      this.elementDataAvaliacao = this.perfilData.talentos.map((talento) => {
        return {
          skill: talento
        };
      }); 
      this.displayedColumnsSkills = ['skill'];
    } 

    this.dataSourceMentorias = new MatTableDataSource(this.elementDataMentoriasPerfil);
    this.dataSourceSkills = new MatTableDataSource(this.elementDataAvaliacao);
  }

  onFirstAction(mentoria: any) {
    this.dialog.open(MentoriaStudentDetailsComponent, {
      width: '800px',
      data: { mentoria: mentoria }
    });
  }

  getCep(endereco: string) {
    return endereco.replace(/\D/g, '');
  }

  getEnderecoSmall(endereco: string) {
    return endereco.split(/[0-9]/)[0]
  }

  getCidade(endereco: string) {
    let enderecoSeparado = endereco.split("/")[0].split(" ");
    return enderecoSeparado[enderecoSeparado.length - 2];
  }

}
