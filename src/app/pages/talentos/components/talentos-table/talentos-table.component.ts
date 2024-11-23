import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlunoData } from '@core/interfaces/models';
import { AlunoService } from '@core/services/aluno.service';
import { SessionService } from '@core/services/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-talentos-table',
  templateUrl: './talentos-table.component.html',
  styleUrl: './talentos-table.component.scss',
})
export class TalentosTableComponent implements OnInit {
  private readonly ngUnsubscribe$ = new Subject<boolean>();
  displayedColumns: string[] = ['nome', 'idade', 'skills'];
  elementData: AlunoData[] = [];
  dataSource: MatTableDataSource<AlunoData> = new MatTableDataSource(
    this.elementData
  );

  constructor(
    private alunoService: AlunoService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTalentos();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  private getTalentos() {
    this.alunoService
      .getAlunos(this.sessionService.getAccessToken())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.elementData = res.body.map((aluno: AlunoData) => {
            return {
              id: aluno.id,
              nome: aluno.nome,
              idade: aluno.idade,
              cpf: aluno.cpf,
              email: aluno.email,
              linkedin: aluno.linkedin,
              pronomes: aluno.pronomes,
              endereco: aluno.endereco,
              talentos: aluno.talentos,
              skills: aluno.talentos.map((talento) => talento.nome),
            };
          });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.dataSource = new MatTableDataSource(this.elementData);
        },
      });
  }

  getAlunoPerfil(aluno) {
    this.router.navigate(['/perfil'], { queryParams: { id:aluno.id, perfil: 'aluno' } });
  }
}
